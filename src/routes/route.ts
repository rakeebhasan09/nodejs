import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller.js";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
        // console.log("This is root route and Method is GET.");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This is root route." }));
    } else if (url?.startsWith("/products")) {
        productController(req, res);
    } else {
        // console.log("This route isn't defined.");
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This route isn't defined." }));
    }
};

export default routeHandler;
