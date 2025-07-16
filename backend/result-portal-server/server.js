require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const resultRoutes = require("./routes/result");
const uploadRoutes = require("./routes/upload");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api", resultRoutes);
app.use("/api/admin", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
