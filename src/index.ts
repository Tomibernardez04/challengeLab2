import express from 'express';
import dotenv from 'dotenv';
import UserController from "./controller/UserController";
import StatsController from "./controller/StatsController"

dotenv.config();

const app = express();

app.use(express.json());
app.use(UserController);
app.use(StatsController);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
