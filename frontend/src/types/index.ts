// src/types/index.ts
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "rent" | "sale";
  image: string;
}
