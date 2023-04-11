import { APIGatewayProxyResult } from "aws-lambda";

export function response(status: number, json: Object): APIGatewayProxyResult {
    return {
        statusCode: status ?? 200,
        body: JSON.stringify(json)
    }
}
