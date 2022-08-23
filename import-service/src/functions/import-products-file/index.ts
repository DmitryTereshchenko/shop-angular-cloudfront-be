import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/importProductsFile.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        authorizer: {
          name: 'importAuth',
          arn: 'arn:aws:lambda:eu-west-1:073199102284:function:authorization-service-dev-basicAuthorizer',
          identitySource: 'method.request.header.Authorization',
          type: 'token',
          resultTtlInSeconds: 0
        }
      }
    }
  ]
}