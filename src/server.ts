import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./routes/route.js";

const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        // console.log(req);
        routeHandler(req, res);
    },
);

server.listen(5000, () => {
    console.log(`Server is runnig on port ${5000}`);
});
