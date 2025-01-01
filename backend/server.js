import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Application Listening at:- http://localhost:3000
server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})