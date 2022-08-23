import {
  APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import {generatePolicy} from "@libs/util";

export const handler = (event: APIGatewayTokenAuthorizerEvent, _, callback: APIGatewayAuthorizerCallback) => {
  console.log('Event:', event);
  if(event.type !== 'TOKEN') {
    callback('Unauthorized');
  }

  try {
    const { authorizationToken: authToken, methodArn } = event;
    const encodedCreds = authToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');

    const username = plainCreds[0];
    const password = plainCreds[1];

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, methodArn, effect);

    return callback(null, policy);
  }
  catch (e) {
    return callback(`Unauthorized: ${e.message}`);
  }
}