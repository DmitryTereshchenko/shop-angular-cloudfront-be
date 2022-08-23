import {APIGatewayAuthorizerResult} from "aws-lambda/trigger/api-gateway-authorizer";

export const generatePolicy = (principalId: string, resource: string, effect: 'Deny' | 'Allow'): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: effect,
          Action: 'execute-api:Invoke',
          Resource: resource
        }
      ]
    }
  }
}

// const a = Buffer.from('dmitrytereshchenko:TEST_PASSWORD');
// const b = a.toString('base64');
//
// console.log(b);