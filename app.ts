import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import useragent from "express-useragent";
import Knex from "knex";
import ip from "ip";

const PORT = 3000;
dotenv.config();

//express setting
const app = express();
const server = new http.Server(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(useragent.express());

//knex
const knexConfigs = require("./knexfile");
const environment = process.env.ENV || "development";
const knexConfig = knexConfigs[environment];
export const knex = Knex(knexConfig);

//controller and services
import { ListService } from "./service/listService";
import { ListsController } from "./controller/listController";
const listService = new ListService();
export const listController = new ListsController(listService);

//routes setting
import { routes } from "./routes";
app.use("/", routes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: `Route not match, method: ${req.method}, url: ${req.url}`,
    });
});

const message = `
==================================
Listening at: http://localhost:${PORT}
On Network: http://${ip.address()}:${PORT}
==================================
`;

server.listen(PORT, () => {
    console.clear();
    console.log(message);
});
