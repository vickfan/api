import express from "express";
import { listController } from "./app";

export const routes = express.Router();

routes.get("/lists", listController.getLists);
routes.get("/list/:listId", listController.getList);
routes.get("/tasks/:listId", listController.getTasksByListId);
