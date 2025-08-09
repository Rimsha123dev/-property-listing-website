"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// ✅ Send a new message
router.post("/", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, propertyId, receiverId } = req.body;
        const user = req.user;
        const message = yield prisma_1.prisma.message.create({
            data: {
                content,
                senderId: user.id, // from JWT middleware
                receiverId,
                propertyId,
            },
        });
        res.status(201).json(message);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Message sending failed" });
    }
}));
// ✅ Get all messages for a property
router.get("/:propertyId", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyId } = req.params;
        const messages = yield prisma_1.prisma.message.findMany({
            where: {
                propertyId,
            },
            orderBy: {
                createdAt: "asc",
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        // image: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        // image: true,
                    },
                },
            },
        });
        res.status(200).json(messages);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fetching messages failed" });
    }
}));
exports.default = router;
