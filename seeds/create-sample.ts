import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tasks").del();
    await knex("lists").del();

    // Inserts seed entries
    await knex("lists").insert([
        { is_active: true, name: "Bucket List" },
        { is_active: true, name: "To Do List" },
        { is_active: false, name: "deleted list" },
    ]);

    await knex("tasks").insert([
        {
            name: "travel",
            description: "travel to the UK",
            list_id: 1,
            is_active: true,
            is_completed: false,
        },
        {
            name: "visiting",
            description: "visit Anfield",
            list_id: 1,
            is_active: true,
            is_completed: false,
        },
        {
            name: "shopping",
            description: "buy milk",
            list_id: 2,
            is_active: true,
            is_completed: false,
        },
        {
            name: "daily",
            description: "wake up",
            list_id: 2,
            is_active: true,
            is_completed: true,
        },
        {
            name: "deleted",
            description: "deleted",
            list_id: 2,
            is_active: false,
            is_completed: false,
        },
    ]);
}
