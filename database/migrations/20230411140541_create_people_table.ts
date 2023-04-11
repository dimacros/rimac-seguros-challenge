import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('people', table => {
        table.increments('id');
        table.string('name');
        table.string('birth_year');
        table.string('eye_color').defaultTo('n/a');
        table.enum('gender', ['male', 'female', 'unknow', 'n/a']).defaultTo('n/a');
        table.string('hair_color').defaultTo('n/a');
        table.string('height');
        table.string('mass');
        table.string('skin_color');
        table.timestamps({ useTimestamps: true, defaultToNow: true });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('people');
}
