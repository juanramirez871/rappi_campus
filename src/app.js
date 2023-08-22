import express from "express"
import rateLimit from "./config/rateLimit.js";
import routeIndex from "./routes/index.js";
import "dotenv/config.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app
    .use(rateLimit)

    .use(express.json())

    .use(async(req, res, next) => {
        app.use("/api", await routeIndex(req.header('Accept-version') || "v1"));
        next()
    })

    .listen(PORT, ()=> {
        console.log(`server in http://127.10.10.10:${PORT}`);
    })