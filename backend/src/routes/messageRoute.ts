import express from "express";
import { prisma } from "../lib/prisma";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Send a new message
router.post("/", protect, async (req, res) => {
  try {
    const { content, propertyId, receiverId } = req.body;
    const user = req.user!;

    const message = await prisma.message.create({
      data: {
        content,
        senderId: user.id, // from JWT middleware
        receiverId,
        propertyId,
      },
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Message sending failed" });
  }
});

// ✅ Get all messages for a property
router.get("/:propertyId", protect, async (req, res) => {
  try {
    const { propertyId } = req.params;

    const messages = await prisma.message.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetching messages failed" });
  }
});

export default router;
