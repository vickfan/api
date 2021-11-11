import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("lists", (table) => {
        table.increments();
        table.text("name").notNullable();
        table.boolean("is_active").notNullable();
        table.timestamps(false, true);
    });

    await knex.schema.createTable("tasks", (table) => {
        table.increments();
        table.date("deadline");
        table.text("name").notNullable();
        table.text("description").notNullable();
        table.integer("list_id").unsigned();
        table.foreign("list_id").references("lists.id");
        table.boolean("is_active").notNullable();
        table.boolean("is_completed").notNullable();
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tasks");
    await knex.schema.dropTable("lists");
}
