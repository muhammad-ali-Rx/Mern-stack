import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.mjs";
import productRouter from "./Routes/ProductRoute.mjs";
import imgRouter from "./Routes/imgRoute.mjs";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());


app.use("/api", productRouter);
app.use("/api", imgRouter);

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Server Error",
    error: err.message || "Unknown error",
  });
});


app.get("/", (req, res) => {
  res.send("Welcome to the Express App!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 App is running on http://localhost:${PORT}`);
});
