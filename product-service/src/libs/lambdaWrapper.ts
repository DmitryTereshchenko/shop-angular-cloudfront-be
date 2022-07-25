import {APIGatewayProxyEvent} from "aws-lambda";
import {failResponse, successResponse} from "@libs/responseBuilder";

export const lambdaWrapper = (callback: Function) => {
  return async (event: APIGatewayProxyEvent) => {
    try {
      const { body, pathParameters } = event;
      console.log('===> Request: ', { body, pathParameters });
      const res = await callback(event);
      console.log('<=== Response: ', res);
      return successResponse(res, res.statusCode);
    } catch (e) {
      console.log(`===> Error: `, e.message);
      return failResponse(e.message, e.statusCode);
    }
  }
}