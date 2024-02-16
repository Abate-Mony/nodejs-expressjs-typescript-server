// import fs from "fs";
import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors"; //keep to lib at the top of your file
import connection from "./db/connection.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import authRouter from "./routes/AuthRoute.js";
import createUser from "./utils/createUser.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
// const __dirname = dirname(fileURLToPath(import.meta.url));
// if (process.env.NODE_ENV || process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }
// app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.get("/", async (req, res) => {
    const { email, name, password } = req.query;
    const time = Date.now();
    //   await wait();
    //   console.log("start to create user");
    const newUser = createUser({
        email,
        name,
        password,
    });
    console.log("finish creating user");
    console.log(Date.now() - time);
    res.send({ user: newUser });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/products", productRouter);
app.use("*", async (req, res) => {
    res.status(200).send("routes not found 404");
});
app.use(errorHandlerMiddleware);
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`app is runing on port ${port}`);
        });
        console.log("mongourl", process.env.MONGO_URL);
        await connection(process.env.MONGO_URL);
    }
    catch (err) {
        console.log(`err:`, err);
    }
};
start();
// const user = createUser();
//# sourceMappingURL=server.js.map