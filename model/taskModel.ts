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

    static async moveTasks(taskIdList: number[], listId: number) {
        const txn = await knex.transaction();
        try {
            for (let id of taskIdList) {
                await txn
                    .update({ list_id: listId })
                    .into("tasks")
                    .where("id", id);
            }
            await txn.commit();
        } catch {
            await txn.rollback();
        }
        return;
    }

    static async getTaskByTaskId(taskId: number) {
        return await knex.select("*").from("tasks").where("id", taskId).first();
    }

    static async updateTask(
        row: {
            name: string;
            description: string;
            deadline?: Date;
            is_completed: boolean;
        },
        taskId: number
    ) {
        await knex.update(row).into("tasks").where("id", taskId);
        return;
    }

    static async getTasksByExpiryDate(today: string) {
        return await knex
            .select("*")
            .from("tasks")
            .where("deadline", today)
            .andWhere("is_completed", false);
    }
}
