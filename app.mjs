import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.mjs";
import productRouter from "./Routes/ProductRoute.mjs";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());


app.use("/api", productRouter);



app.get("/", (req, res) => {
  res.send("Welcome to the Express App!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 App is running on http://localhost:${PORT}`);
});
