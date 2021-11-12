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

    async moveTasks(taskIdList: number[], listId: number) {
        await Tasks.moveTasks(taskIdList, listId);
        return;
    }

    async updateTask(
        row: {
            name: string;
            description: string;
            deadline?: Date;
            is_completed: boolean;
        },
        taskId: number
    ) {
        await Tasks.updateTask(row, taskId);
        return;
    }
}
