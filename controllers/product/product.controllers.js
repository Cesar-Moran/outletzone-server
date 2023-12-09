const prisma = require("../../db");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

// Get the S3 bucket credentials from the process.env
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// Product categories availables
const categories = [
  "LAVADORA",
  "NEVERA",
  "TELEFONO",
  "ESTUFA",
  "TELEVISOR",
  "ARTICULOPARAHOGAR",
  "COMPUTADORA",
  "GENERAL",
  "ORGANIZADORES",
  "ACCESORIOS",
  "ACCESORIOCOCINA",
  "REPUESTOS",
];

// Random image name to each product image, to prevent s3 images replacing images with same name
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// Creates the client connection to the s3 bucket with the credentials
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// Add product function

const addProduct = async (req, res) => {
  const {
    product_name,
    product_price,
    product_details,
    product_description,
    product_condition,
    product_quantity,
    product_shipping,
    product_location,
    product_image,
    product_status,
    product_guarantee,
    category,
  } = req.body;

  const imageName = randomImageName();

  if (
    !product_price ||
    !product_quantity ||
    !product_shipping ||
    !product_location ||
    !product_status ||
    !product_guarantee ||
    !product_description ||
    !product_condition ||
    !product_details ||
    !product_name
  ) {
    res.status(400).send("Los campos deben estar llenos");
    return;
  }

  if (req.file?.buffer === undefined) {
    res.status(400).send("La imagen también es requerida");
    return;
  }

  // This params will execute on the put object command
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req?.file?.buffer,
    ContentType: req.file?.mimetype,
  };
  // Assigns the params to the put object command
  const command = new PutObjectCommand(params);
  // Sends the command to the s3 bucket (basically it's sending the image to the s3 bucket)
  await s3.send(command);

  /// If category field of the client doesn't includes any of the available categories, send an error
  if (!categories.includes(category.toUpperCase())) {
    return res.status(400).send("Invalid category");
  }

  // If everything goes well, create the product into the database
  const product = await prisma.product.create({
    data: {
      product_name,
      product_price: parseInt(product_price),
      product_details,
      product_description,
      product_condition,
      product_quantity: parseInt(product_quantity),
      product_shipping,
      product_location,
      // Here we assign the imageName (which is the random image name) so we can get the image later with just the image name
      product_image: imageName,
      product_status,
      product_guarantee,
      category,
    },
  });

  console.log(product);
  res.send(product);
};

const displayProducts = async (req, res) => {
  const products = await prisma.product.findMany();

  for (const product of products) {
    // For each product found in products findMany function, do the following code:
    if (product.product_image) {
      // If product.product_image is found (true), get a signedUrl for the specific image of that product
      const getObjectParams = {
        Bucket: bucketName,
        Key: product.product_image,
      };

      const command = new GetObjectCommand(getObjectParams);
      // getSignedUrl accepts 3 parameters: the s3 client connection, the command that will be executed
      // and optionally you can pass a expiresIn and other options
      const url = await getSignedUrl(s3, command);
      // Creates a imageUrl link in the database with the signed url
      product.imageUrl = url;
    }
  }

  // Sends the products with the images included
  res.json(products);
};

const displaySingleProduct = async (req, res) => {
  // Get the first product where the id is the same as the id on the url params.
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
    },
  });

  // Does the same process on displayProducts
  if (product?.product_image) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.product_image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command);
    product.imageUrl = url;
  }

  // Sends the product
  res.send(product);
};

const verifyProductQuantity = async (req, res) => {
  // Find the first product what has the same id that is on the url params
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
    },
    // Get only the product_quantity field
    select: {
      product_quantity: true,
    },
  });

  // Send the quantityAvailable from the product
  res.json({ quantityAvailable: product });
};

const deleteProduct = async (req, res) => {
  const productToDelete = await prisma.product.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!productToDelete) {
    return res.status(400).status("Product not found");
  }

  const deletedProduct = await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });

  res.send(deletedProduct);
};

const getProductToEdit = async (req, res) => {
  const productToEdit = await prisma.product.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.send(productToEdit);
};

const editProduct = async (req, res) => {
  const {
    editedName,
    editedPrice,
    editedDisponibility,
    editedCondition,
    editedLocation,
    editedStatus,
  } = req.body;

  if (
    !editedName ||
    !editedPrice ||
    !editedDisponibility ||
    !editedCondition ||
    !editedLocation ||
    !editedStatus
  ) {
    res.status(400).send("Los campos deben estar llenos");
    return;
  }
  const productToEdit = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      product_name: editedName,
      product_price: editedPrice,
      product_quantity: editedDisponibility,
      product_condition: editedCondition,
      product_location: editedLocation,
      product_status: editedStatus,
    },
  });

  res.send(productToEdit);
};

module.exports = {
  uploadSingle: upload.single("product_image"),
  addProduct,
  displayProducts,
  displaySingleProduct,
  verifyProductQuantity,
  deleteProduct,
  editProduct,
  getProductToEdit,
};
