import { knex } from "../app";
import { Model } from "objection";

interface ListRow {
    id: number;
    name: string;
    is_active?: boolean;
}

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
            .select("id", "content", "deadline", "is_completed")
            .from("tasks")
            .where("list_id", listId)
            .andWhere("is_active", true);
    }
}
