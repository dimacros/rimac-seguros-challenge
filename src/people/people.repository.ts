import { Knex } from "knex";
import { People } from "./people.domain";

export const SavePeople = async (person: Partial<People>, database: Knex.QueryBuilder) => {
    const [newPerson] = await database.insert(person).returning<People[]>('*');

    return newPerson;
}

export const FindPeople = (database: Knex.QueryBuilder) => {
    return database.select<People[]>('*');
}