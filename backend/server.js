import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { RSA_NO_PADDING } from "constants";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// just to fetch out JSON
app.use(express.json());

// route to products
app.use("/api/products", productRoutes);
// route to userLogin
app.use("/api/users", userRoutes);
// route form orders n stuff
app.use("/api/orders", orderRoutes);
// Images Uploads using multer
app.use("/api/upload", uploadRoutes);
// Paypal payment route
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Making a static folder in browser for the images
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// For production Mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

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
