"use strict";
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import { prisma } from "../lib/prisma";
// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//     });
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }
//     req.user = user; // you already fixed typing in `express/index.d.ts`
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
