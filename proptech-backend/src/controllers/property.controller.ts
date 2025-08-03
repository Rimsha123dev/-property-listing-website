import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createProperty = async (req: Request, res: Response) => {
  const { title, description, price, location, image ,type} = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!title || !price || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const property = await prisma.property.create({
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
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
};

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await prisma.property.findMany();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
// update
export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price, location, image, type } = req.body;
   const user = req.user; // coming from protect middleware

  try {
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

   if (!user || existingProperty.ownerId !== user.id) {

      return res.status(403).json({ message: "Not authorized to update this property" });
    }

    const updatedProperty = await prisma.property.update({
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
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating property", error });
  }
};


// delete

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user; // added by protect middleware

  try {
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (existingProperty.ownerId !== user?.id) {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }

    await prisma.property.delete({
      where: { id },
    });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting property", error });
  }
};
