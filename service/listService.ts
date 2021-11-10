import { Lists } from "../model/listsModel";

export class ListService {
    async getLists() {
        let lists = await Lists.getActiveLists();
        return lists;
    }

    async getList(id: number) {
        let list = await Lists.getList(id);
        return list;
    }

    async getTasksByListId(listId: number) {
        let tasks = await Lists.getTasksByListId(listId);
        return tasks;
    }
}
