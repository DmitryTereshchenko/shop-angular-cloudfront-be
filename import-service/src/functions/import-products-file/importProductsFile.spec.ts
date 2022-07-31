import AWS from 'aws-sdk-mock';
import { handler } from './importProductsFile';
import {APIGatewayProxyEvent} from "aws-lambda";

AWS.mock('S3', 'getSignedUrl', (action, _params, callback) => {
  callback(null,_params.Key);
});

describe('importProductsFile', () => {
  it('should work properly', async() => {
    const mockEvent = {
      queryStringParameters: {
        name: 'test'
      }
    } as Partial<APIGatewayProxyEvent>;
    const data = await handler(mockEvent);

    expect(data.statusCode).toBe(200);
    expect(data.body).toContain('https://angular-shop-bucket-uploaded.s3.amazonaws.com/uploaded/test');
  });

  it('should return error', async () => {
    const data = await handler({});

    expect(data.statusCode).toBe(500);
  });
})