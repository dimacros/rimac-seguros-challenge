import { Knex } from "knex";
import { CreatePeopleRequest, People, PeopleResponse } from "./people.domain";
import { FindPeople, SavePeople } from "./people.repository";

export async function createPeople(request: CreatePeopleRequest, database: Knex.QueryBuilder) {
    const people = await SavePeople({
        name: request.nombre,
        birth_year: request.año_de_nacimiento,
        eye_color: request.color_de_ojos,
        gender: request.genero,
        hair_color: request.color_de_cabello,
        height: request.altura,
        mass: request.masa_en_kg,
        skin_color: request.color_de_piel,
    }, database);

    return personToSpanishResponse(people);
}

export async function getAllPeople(database: Knex.QueryBuilder): Promise<PeopleResponse[]> {
    const people = await FindPeople(database);

    return people.map(person => personToSpanishResponse(person));
}

const personToSpanishResponse = (people: People): PeopleResponse => {
    return {
        "id": people.id,
        "nombre": people.name,
        "año_de_nacimiento": people.birth_year,
        "color_de_ojos": people.eye_color,
        "genero": people.gender,
        "color_de_cabello": people.hair_color,
        "altura": people.height,
        "masa_en_kg": people.mass,
        "color_de_piel": people.skin_color,
        "creado": people.created_at,
        "actualizado": people.updated_at,
    }
}
