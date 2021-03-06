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
            console.error(e);
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
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    postNewTask = async (req: Request, res: Response) => {
        let listName = req.body.listName;
        try {
            await this.listService.postNewList(listName);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    deleteList = async (req: Request, res: Response) => {
        let { selectedList } = req.body;
        try {
            for (let id of selectedList) {
                await this.listService.deleteList(id);
            }
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };
}
