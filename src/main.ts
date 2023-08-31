import express, { Express } from "express";
import dotenv from "dotenv";
import { folderList } from "./handlers/explorerHandler";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { AppError } from "./utils/appError";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || "8080";

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);
const limiter = rateLimit({
    max: 1000,
    windowMs: 1 * 60 * 1000,
    message: new AppError(`Too many requests from this IP, please try again in an 1 minutes`, 429)
});

app.use("*", limiter);

app.get("/api/dir", folderList);

// route not found
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
