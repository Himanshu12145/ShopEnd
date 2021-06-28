import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
// just to fetch out JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
// route to products
app.use("/api/products", productRoutes);
// route to userLogin
app.use("/api/users", userRoutes);
// route form orders n stuff
app.use("/api/orders", orderRoutes);
// Paypal payment route
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running  in ${process.env.NODE_ENV} mode on PORT ${PORT}`.magenta
      .underline.bold
  )
);
