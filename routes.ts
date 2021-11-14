import express from "express";
import { listController, taskController } from "./app";

export const routes = express.Router();

routes.get("/lists", listController.getLists);
routes.get("/list/:listId", listController.getList);
routes.post("/newList", listController.postNewTask);
routes.put("/list", listController.deleteList);

routes.get("/tasks/:listId", taskController.getTasksByListId);
routes.get("/task/:taskId", taskController.completeTask);
routes.post("/task", taskController.newTask);
routes.put("/task", taskController.deleteTask);
routes.put("/tasks/move", taskController.moveTasks);
routes.put("/task/:taskId", taskController.updateTask);
// routes.get("/expiringTask", taskController.getExpiringTask);
