
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import propertyRoutes from "./routes/property.routes";
import uploadRoute from "./routes/uploadRoute";
import messageRoute from "./routes/messageRoute";



// Below other route usages


dotenv.config();

const app = express();

// ✅ Body parser middleware — add this!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS (already there but still)
app.use(cors());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/properties/upload", uploadRoute);
app.use("/api/messages", messageRoute);

app.get("/",(_req,res)=>{
  res.send("api is runing")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
