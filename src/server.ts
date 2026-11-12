import { createServer } from "http";

const server = createServer((req, res) => {
    console.log(req);
});

server.listen(5000, () => {
    console.log(`Server is runnig on port ${5000}`);
});
