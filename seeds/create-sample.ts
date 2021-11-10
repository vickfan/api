import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tasks").del();
    await knex("lists").del();

    // Inserts seed entries
    await knex("lists").insert([
        { id: 1, is_active: true, name: "Bucket List" },
        { id: 2, is_active: true, name: "To Do List" },
        { id: 3, is_active: false, name: "deleted list" },
    ]);

    await knex("tasks").insert([
        {
            content: "travel to the UK",
            list_id: 1,
            is_active: true,
            is_completed: false,
        },
        {
            content: "visit Anfield",
            list_id: 1,
            is_active: true,
            is_completed: false,
        },
        {
            content: "buy milk",
            list_id: 2,
            is_active: true,
            is_completed: false,
        },
        { content: "wake up", list_id: 2, is_active: true, is_completed: true },
        {
            content: "deleted",
            list_id: 2,
            is_active: false,
            is_completed: false,
        },
    ]);
}
