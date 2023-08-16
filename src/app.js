import express from "express"
import rateLimit from "./config/rateLimit.js";
import routeIndex from "./routes/index.js";
import "dotenv/config.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);
app
    .use(rateLimit)

    .use("/api", routeIndex)

    .listen(PORT, ()=> {
        console.log(`server in http://127.10.10.10:${PORT}`);
    })