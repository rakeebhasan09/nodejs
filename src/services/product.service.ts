import fs from "fs";
import path from "path";
import type { IProduct } from "../types/product.js";

const filePath = path.join(process.cwd(), "./src/database/db.json");

// Get Method
export const productService = () => {
    const result = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(result);
};

// Post Method
export const createProduct = (payload: IProduct[]) => {
    fs.writeFileSync(filePath, JSON.stringify(payload));
};
