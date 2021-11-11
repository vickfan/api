import { Request, Response } from "express";
import { TasksService } from "../service/taskService";

export class TasksController {
    constructor(private taskService: TasksService) {}

    getTasksByListId = async (req: Request, res: Response) => {
        let params = req.params.listId;
        let id = parseInt(params);
        try {
            let tasks = await this.taskService.getTasksByListId(id);
            res.status(200).json(tasks);
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    completeTask = async (req: Request, res: Response) => {
        let params = req.params.taskId;
        let id = parseInt(params);
        try {
            await this.taskService.completeTask(id);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    newTask = async (req: Request, res: Response) => {
        let body = req.body;
        try {
            await this.taskService.newTask(body);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    deleteTask = async (req: Request, res: Response) => {
        let { selectedList } = req.body;
        try {
            await this.taskService.deleteTask(selectedList);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };
}
