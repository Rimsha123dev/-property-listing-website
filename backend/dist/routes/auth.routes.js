"use strict";
// // src/routes/auth.routes.ts
// import express from "express";
// import { registerUser, loginUser } from "../controllers/auth.controller";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// export default router;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.registerUser);
router.post('/login', auth_controller_1.loginUser);
exports.default = router;
