# Introduction

This is a challenge from INDRA company.

Requirements:
- Nodejs v.18
- Mysql v.8
- Serverless Framework
- AWS Credentials

## Installation & Setup
Once you cloned the repository and initialized docker. Execute the command:
`docker-compose up --build`

After that, copy the file `.env.sample` to `.env` and put your aws credentials.

And then execute `docker-compose exec app bash`. 

Now you can install the dependencies `npm install`, run the migrations `npx knex migrate:up` and have initial data  `npx knex seed:run`. Also you can run the unit tests `npm run test`

## Usage
You can create, retrieve people in the next routes:

### Create a Person

```bash
curl -X POST http://localhost:3000/people --data '{"nombre":"Marcos","año_de_nacimiento":"19BBY","color_de_ojos":"brow","genero":"male","color_de_cabello":"black","altura":"170","masa_en_kg":"75","color_de_piel":"white"}'
```

Example Result:
```bash
{"id":1,"nombre":"Marcos","año_de_nacimiento":"19BBY","color_de_ojos":"brow","genero":"male","color_de_cabello":"black","altura":"170","masa_en_kg":"75","color_de_piel":"white","creado":null,"actualizado":null}
```

### Get all People

```bash
curl https://localhost:3000/people
```

