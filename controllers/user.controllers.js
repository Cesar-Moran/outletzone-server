const prisma = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  // Get the values from the body
  const { email, password, confirm_password } = req.body;

  // Find a user in the database with the email  that is being sent to the server
  const validEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If valid email, give an error

  if (validEmail) {
    return res.status(500).send("El email ya existe.");
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // If the confirm password is not equal to the password, give an error with the status code 500
  // , the message and return so it cancels the following code.
  if (confirm_password !== password) {
    return res
      .status(500)
      .send("El campo de confirmar contraseña no es igual a la contraseña.");
  }

  // If everything is ok, create the user with the data.

  // Send the user in JSON with a status code of 200

  const userRequest = await prisma.registeredUsers.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(200).json(userRequest);
};

const registerRequests = async (req, res) => {
  const requests = await prisma.registeredUsers.findMany();
  res.send(requests);
};

const acceptRequest = async (req, res) => {
  const validRequest = await prisma.registeredUsers.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!validRequest) {
    return res.status(500).send("Request inválida");
  }

  const user = await prisma.user.create({
    data: {
      email: validRequest.email,
      password: validRequest.password,
    },
  });

  const deletedRegisterRow = await prisma.registeredUsers.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.send({ user, deletedRegisterRow });
};

// Login controller
const login = async (req, res) => {
  // Get the email and password from the client

  const { email, password } = req.body;

  // Find a unique email in the database.

  const validUser = await prisma.user.findUnique({ where: { email } });

  // If validUser is false, it means that the email doesn't exists in the database, which means that the user is not
  // registered. Send an error with a status code of 500 and a message.
  if (!validUser) {
    return res
      .status(500)
      .send("No se pudo encontrar un usuario con ese email.");
  }

  // Compare the password that the client sent with the valid user password and store it in a variable

  const validPassword = await bcrypt.compare(password, validUser.password);

  // If the password is not valid with the hashed password in the database, send an error
  // with the status code of 500 and a message.
  if (!validPassword) {
    return res.status(500).send("La contraseña no es válida.");
  }

  try {
    // If everything goes well, create a token, first the payload (the information that the token will store)
    // Then, the jwtSecret is to ensure the password is safe and not anyone can guess it.
    // the expiresIn is the time that the token will last until it expires in this case 1 hour

    const token = jwt.sign(
      {
        id: validUser.id,
        email: validUser.email,
        createdAt: validUser.createdAt,
        role: validUser.role,
      },
      jwtSecret
    );
    console.log(token);
    res.json(token);
  } catch (err) {
    console.error(
      `There was an error when trying to sign the token ${err.message}`
    );
    res.status(500).send("Error interno del servidor al generar el token.");
  }
};

module.exports = { register, login, registerRequests, acceptRequest };
