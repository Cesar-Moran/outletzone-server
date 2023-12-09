const prisma = require("../../db");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

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

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const filterProductsByCategory = async (req, res) => {
  // Finds all the products that have the category that is being passed on the url params
  const filteredProducts = await prisma.product.findMany({
    where: {
      category: req.params.category,
    },
  });

  for (const product of filteredProducts) {
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

  // Sends the filtered products
  res.send(filteredProducts);
};

const filterProductsByGuarantee = async (req, res) => {
  // Finds all the products that have the guarantee that is being passed on the url params
  const filteredProducts = await prisma.product.findMany({
    where: {
      product_guarantee: req.params.guarantee,
    },
  });

  for (const product of filteredProducts) {
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

  // Sends the filtered products
  res.send(filteredProducts);
};

module.exports = { filterProductsByCategory, filterProductsByGuarantee };
