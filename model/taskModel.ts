import { knex } from "../app";
import { Model } from "objection";

Model.knex(knex);

export class Tasks extends Model {
    static table() {
        return knex("tasks");
    }

    static getTasksByListId(listId: number) {
        return knex
            .select("id", "name", "description", "deadline", "is_completed")
            .from("tasks")
            .where("list_id", listId)
            .andWhere("is_active", true);
    }

    static async completeTask(taskId: number) {
        await knex
            .update({ is_completed: true })
            .into("tasks")
            .where("id", taskId);
    }

    static async newTask(row: {
        name: string;
        deadline?: Date;
        description: string;
        list_id: number;
        is_active: boolean;
        is_completed: boolean;
    }) {
        await knex.insert(row).into("tasks");
        return;
    }

    static async deleteTask(taskIdList: number[]) {
        const txn = await knex.transaction();
        try {
            for (let id of taskIdList) {
                await txn
                    .update({ is_active: false })
                    .into("tasks")
                    .where("id", id);
            }
            await txn.commit();
        } catch {
            await txn.rollback();
        }
        return;
    }
}
