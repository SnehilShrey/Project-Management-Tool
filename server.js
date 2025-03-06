require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// ✅ Correct CORS Configuration  
const corsOptions = {
    origin: "http://localhost:5173", // ✅ Allow only frontend URL
    credentials: true,               // ✅ Allow cookies & authentication headers
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow necessary headers
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow required HTTP methods
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB  
connectDB();

// ✅ Load API Routes  
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", projectRoutes);  
app.use("/api/tasks", require("./routes/taskRoutes"));

// ✅ Start Server  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));