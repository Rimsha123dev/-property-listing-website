"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.routes";
// import protectedRoutes from "./routes/protected.routes";
// import propertyRoutes from "./routes/property.routes";
// import uploadRoute from "./routes/uploadRoute";
// import messageRoute from "./routes/messageRoute";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Below other route usages
// dotenv.config();
// const app = express();
// // ✅ Body parser middleware — add this!
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // ✅ CORS (already there but still)
// app.use(cors());
// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api", protectedRoutes);
// app.use("/api/properties", propertyRoutes);
// app.use("/api/properties/upload", uploadRoute);
// app.use("/api/messages", messageRoute);
// app.get("/",(_req,res)=>{
//   res.send("api is runing")
// })
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const protected_routes_1 = __importDefault(require("./routes/protected.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// ✅ Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api", protected_routes_1.default);
app.use("/api/properties", property_routes_1.default);
app.use("/api/properties/upload", uploadRoute_1.default);
app.use("/api/messages", messageRoute_1.default);
app.get("/", (_req, res) => {
    res.send("API is running 🚀");
});
exports.default = app; // 👈 yahan export karna important hai
