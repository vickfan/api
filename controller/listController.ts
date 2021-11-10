import { Request, Response } from "express";
import { ListService } from "../service/listService";

export class ListsController {
    constructor(private listService: ListService) {}

    getLists = async (req: Request, res: Response) => {
        try {
            let lists = await this.listService.getLists();
            res.status(200).json(lists);
            return;
        } catch (e) {
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    getList = async (req: Request, res: Response) => {
        let params = req.params.listId;
        let id = parseInt(params);
        try {
            let list = await this.listService.getList(id);
            res.status(200).json(list);
            return;
        } catch (e) {
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    getTasksByListId = async (req: Request, res: Response) => {
        let params = req.params.listId;
        let id = parseInt(params);
        try {
            let tasks = await this.listService.getTasksByListId(id);
            res.status(200).json(tasks);
            return;
        } catch (e) {
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };
}
