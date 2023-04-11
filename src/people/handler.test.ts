import test from 'ava';
import { createPeople, getAllPeople } from './handler';
import knex from 'knex';
import { createTracker, MockClient } from 'knex-mock-client';

test('Create People', async t => {
    const database = knex({ client: MockClient });
    const tracker = createTracker(database);
    
    tracker.on.insert('people').response([examplePerson()]);

	const person = await createPeople({
        "nombre": "Marcos",
        "año_de_nacimiento": "19BBY",
        "color_de_ojos": "brow",
        "genero": "male",
        "color_de_cabello": "black",
        "altura": "170",
        "masa_en_kg": "75",
        "color_de_piel": "white"
    }, database('people'));

    t.is(person.id, examplePerson()['id']);
});

test('Get People', async t => {
    const database = knex({ client: MockClient });
    const tracker = createTracker(database);
    
    tracker.on.select('people').response([examplePerson()]);

	const people = await getAllPeople(database('people'));

    t.is(true, !!people.find(x => x.id === examplePerson()['id']));
});

function examplePerson() {
    return {
        id: 100,
        name: 'Marcos',
        birth_year: '19BBY',
        eye_color: 'brow',
        gender: 'male',
        hair_color: 'black',
        height: '170',
        mass: '75',
        skin_color: 'white',
        created_at: new Date(),
        updated_at: new Date()
    };
}