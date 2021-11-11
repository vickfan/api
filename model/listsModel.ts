import { knex } from "../app";
import { Model } from "objection";

Model.knex(knex);

export class Lists extends Model {
    static table() {
        return knex("lists");
    }

    static getActiveLists() {
        return knex.select("id", "name").from("lists").where("is_active", true);
    }

    static getList(id: number) {
        return knex.select("id", "name").from("lists").where("id", id);
    }

    static getTasksByListId(listId: number) {
        return knex
            .select("id", "name", "description", "deadline", "is_completed")
            .from("tasks")
            .where("list_id", listId)
            .andWhere("is_active", true);
    }

    static async postNewList(listName: string) {
        await knex.insert({ name: listName, is_active: true }).into("lists");
        return;
    }

    static async deleteList(listId: number) {
        await knex
            .update({ is_active: false })
            .into("lists")
            .where("id", listId);
        return;
    }
}
