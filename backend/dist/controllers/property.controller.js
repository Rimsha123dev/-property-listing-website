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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProperties = exports.uploadImage = exports.deleteProperty = exports.updateProperty = exports.getPropertyById = exports.getAllProperties = exports.createProperty = void 0;
const prisma_1 = require("../lib/prisma");
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, location, image, type } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!title || !price || !location) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const property = yield prisma_1.prisma.property.create({
            data: {
                title,
                description,
                price,
                location,
                image,
                type,
                ownerId: user.id, // linked to user via JWT
            },
        });
        res.status(201).json({ message: "Property created successfully", property });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating property", error });
    }
});
exports.createProperty = createProperty;
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield prisma_1.prisma.property.findMany();
        res.status(200).json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getAllProperties = getAllProperties;
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const property = yield prisma_1.prisma.property.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        // image: true, // if you store profile image
                    },
                },
            },
        });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json(property);
    }
    catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getPropertyById = getPropertyById;
// update
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, price, location, image, type } = req.body;
    const user = req.user; // coming from protect middleware
    try {
        const existingProperty = yield prisma_1.prisma.property.findUnique({
            where: { id },
        });
        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        if (!user || existingProperty.ownerId !== user.id) {
            return res.status(403).json({ message: "Not authorized to update this property" });
        }
        const updatedProperty = yield prisma_1.prisma.property.update({
            where: { id },
            data: {
                title,
                description,
                price,
                location,
                image,
                type,
            },
        });
        res.status(200).json({
            message: "Property updated successfully",
            property: updatedProperty,
        });
    }
    catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Error updating property", error });
    }
});
exports.updateProperty = updateProperty;
// delete
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user; // added by protect middleware
    try {
        const existingProperty = yield prisma_1.prisma.property.findUnique({
            where: { id },
        });
        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        if (existingProperty.ownerId !== (user === null || user === void 0 ? void 0 : user.id)) {
            return res.status(403).json({ message: "Not authorized to delete this property" });
        }
        yield prisma_1.prisma.property.delete({
            where: { id },
        });
        res.status(200).json({ message: "Property deleted successfully" });
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Error deleting property", error });
    }
});
exports.deleteProperty = deleteProperty;
// upload image 
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("📸 File received:", req.file);
    try {
        // Multer puts the uploaded file info in req.file
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // File URL comes from Cloudinary (thanks to multer-storage-cloudinary)
        const imageUrl = req.file.path;
        return res.status(200).json({ message: "Upload successful", imageUrl });
    }
    catch (error) {
        console.error("[UPLOAD_IMAGE]", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.uploadImage = uploadImage;
const searchProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, type, minPrice, maxPrice } = req.query;
        const filters = {};
        if (location) {
            filters.location = {
                contains: String(location),
                mode: 'insensitive',
            };
        }
        if (type) {
            filters.type = String(type);
        }
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice)
                filters.price.gte = Number(minPrice);
            if (maxPrice)
                filters.price.lte = Number(maxPrice);
        }
        const properties = yield prisma_1.prisma.property.findMany({
            where: filters,
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (properties.length === 0) {
            const allProperties = yield prisma_1.prisma.property.findMany();
            return res.status(200).json({
                success: true,
                message: 'No matching properties found. Showing all.',
                filtersApplied: filters,
                properties: allProperties,
            });
        }
        return res.status(200).json({
            success: true,
            count: properties.length,
            properties,
        });
    }
    catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.searchProperties = searchProperties;
// // 🔍 Controller: Search Properties
// export const searchProperties = async (req: Request, res: Response) => {
//   const { location, minPrice, maxPrice, type } = req.query;
//   const filters: any = {};
//   if (location) {
//     filters.location = { contains: location as string, mode: "insensitive" };
//   }
//   if (type) {
//     filters.type = { equals: type as string };
//   }
//   if (minPrice || maxPrice) {
//     filters.price = {};
//     if (minPrice) filters.price.gte = parseInt(minPrice as string);
//     if (maxPrice) filters.price.lte = parseInt(maxPrice as string);
//   }
//   console.log("🔍 Filters being applied:", filters); // 👈 ADD THIS LINE
//   try {
//     const properties = await prisma.property.findMany({
//       where: filters,
//     });
//     if (!properties || properties.length === 0) {
//       return res.status(404).json({ message: "Property not found" });
//     }
//     res.json(properties);
//   } catch (error) {
//     console.error("❌ Search Error:", error); // 👈 ADD THIS TOO
//     res.status(500).json({ message: "Search failed", error });
//   }
// };
