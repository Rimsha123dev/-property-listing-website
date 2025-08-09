// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import prisma from "../config/db";
// import { User } from "@prisma/client";


// interface AuthRequest extends Request {
//   user?: User; // hum baad mein type strong kar denge
// }

// export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

//       const user = await prisma.user.findUnique({
//         where: { id: decoded.id },
//       });

//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       req.user = user; // 🧠 future request handlers can use this
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     return res.status(401).json({ message: "No token provided" });
//   }
// };


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma"; // ✅ Correct path
import { User } from "@prisma/client";

// 👇 Extend Request to include "user"
interface AuthenticatedRequest extends Request {
  user?: User;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ Now no TS error
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
