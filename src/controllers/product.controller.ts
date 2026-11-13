import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../services/product.service.js";

const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    if (url === "/products" && method === "GET") {
        // const products = ;
        const products = productService();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Products retrive successfully.",
                data: products,
            }),
        );
    }
};

export default productController;
