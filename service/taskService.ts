import { Tasks } from "../model/taskModel";

export class TasksService {
    async getTasksByListId(listId: number) {
        let tasks = await Tasks.getTasksByListId(listId);
        return tasks;
    }

    async completeTask(taskId: number) {
        await Tasks.completeTask(taskId);
        return;
    }

    async newTask(row: {
        name: string;
        deadline?: Date;
        description: string;
        list_id: number;
        is_active: boolean;
        is_completed: boolean;
    }) {
        await Tasks.newTask(row);
        return;
    }

    async deleteTask(taskIdList: number[]) {
        await Tasks.deleteTask(taskIdList);
        return;
    }
}
