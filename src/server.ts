import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        // console.log(req);
        const url = req.url;
        const method = req.method;
        if (url === "/" && method === "GET") {
            // console.log("This is root route and Method is GET.");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "This is root route." }));
        } else if (url?.startsWith("/products")) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "This is products route." }));
        } else {
            // console.log("This route isn't defined.");
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "This route isn't defined." }));
        }
    },
);

server.listen(5000, () => {
    console.log(`Server is runnig on port ${5000}`);
});
