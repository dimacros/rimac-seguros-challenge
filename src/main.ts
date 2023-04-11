import { Context } from 'aws-lambda';
import { Callback } from 'aws-lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from './helpers';
import { createPeople, getAllPeople } from './people/handler';
import config from '../knexfile';
import knex from 'knex';

export async function people(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const dbInstance = knex(config[process.env.NODE_ENV ?? 'development']);

  switch (event.requestContext.routeKey) {
    case 'POST /people':
      const newPerson = await createPeople(JSON.parse(event.body ?? '{}'), dbInstance('people'));

      return response(201, newPerson);
    case 'GET /people':
      const people = await getAllPeople(dbInstance('people'));

      return response(200, people);
    default:
      return response(404, { message: 'Not found.' });
  }
};

export async function swagger(_: APIGatewayEvent) {
  const json = await import('./swagger.json');
  const response = {
    statusCode: 200,
    body: JSON.stringify(json)
  }

  return response;
}

export function docs(_: APIGatewayEvent, __: Context, callback: Callback) {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": 'text/html',
    },
    body: `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="SwaggerUI" />
            <title>SwaggerUI</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
          <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js" crossorigin></script>
          <script>
            window.onload = () => {
              window.ui = SwaggerUIBundle({
                url: '/swagger',
                dom_id: '#swagger-ui',
                presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout",
              });
            };
          </script>
        </body>
    </html>`
  }

  return callback(null, response);
}