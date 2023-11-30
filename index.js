const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(productRoutes);

const port = process.env.LISTEN_PORT;

app.listen(port, () => {
  console.log(`Server listening port: ${port}`);
});
