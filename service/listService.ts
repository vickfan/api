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

    async postNewList(listName: string) {
        await Lists.postNewList(listName);
        return;
    }

    async deleteList(listId: number) {
        await Lists.deleteList(listId);
        return;
    }
}
