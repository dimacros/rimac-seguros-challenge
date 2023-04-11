import { Knex } from "knex";
import fetch from 'node-fetch';

export async function seed(knex: Knex): Promise<void> {
    const response = await fetch('https://swapi.dev/api/people');
    const peopleResponse = await response.json() as { results: any[] };
    const records = peopleResponse.results.map(x => ({
        name: x.name,
        birth_year: x.birth_year,
        eye_color: x.eye_color,
        gender: x.gender,
        hair_color: x.hair_color,
        height: x.height,
        mass: x.mass,
        skin_color: x.skin_color
    }));

    // Deletes ALL existing entries
    await knex("people").del();

    // Inserts seed entries
    await knex("people").insert(records);
};
