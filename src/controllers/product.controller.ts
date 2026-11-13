import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../services/product.service.js";
import type { IProduct } from "../types/product.js";
import { bodyParser } from "../utils/parseBody.js";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const urlParams = url?.split("/");
    const id =
        urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    if (url === "/products" && method === "GET") {
        // Get All Products
        const products = productService();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Products retrive successfully.",
                data: products,
            }),
        );
    } else if (method === "GET" && id !== null) {
        // Get Single Product
        const products = productService();
        const product = products.find((product: IProduct) => product.id === id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Product retrive successfully.",
                data: product,
            }),
        );
    } else if (method === "POST" && url === "/products") {
        // Create new product
        const body = await bodyParser(req);

        const newProduct = {
            id: Date.now(),
            ...body,
        };

        const products = productService();
        products.push(newProduct);

        createProduct(products);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Product created successfully.",
                data: newProduct,
            }),
        );
    } else if (method === "PUT" && id !== null) {
        // Update product
        const body = await bodyParser(req);
        const products = productService();
        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Product Not Found.",
                }),
            );
        }

        products[index] = { id: products[index].id, ...body };

        createProduct(products);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Product updated successfully.",
                data: products[index],
            }),
        );
    }
};

export default productController;
