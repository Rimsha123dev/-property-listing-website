"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const protected_routes_1 = __importDefault(require("./routes/protected.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
// Below other route usages
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Body parser middleware — add this!
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ✅ CORS (already there but still)
app.use((0, cors_1.default)());
// ✅ Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api", protected_routes_1.default);
app.use("/api/properties", property_routes_1.default);
app.use("/api/properties/upload", uploadRoute_1.default);
app.use("/api/messages", messageRoute_1.default);
app.get("/", (_req, res) => {
    res.send("api is runing");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
