
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import propertyRoutes from "./routes/property.routes";

dotenv.config();

const app = express();

// ✅ Body parser middleware — add this!
app.use(express.json());

// ✅ CORS (already there but still)
app.use(cors());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
