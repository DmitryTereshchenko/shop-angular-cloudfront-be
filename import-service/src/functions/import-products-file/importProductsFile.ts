import * as AWS from 'aws-sdk';
import {APIGatewayProxyEvent} from "aws-lambda";

const BUCKET = 'angular-shop-bucket-uploaded';
const s3 = new AWS.S3();

export const handler = async (event: APIGatewayProxyEvent | Partial<APIGatewayProxyEvent>) => {
  try {
    const catalogName = event.queryStringParameters.name;
    const catalogPath = `uploaded/${catalogName}`;

    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      Expires: 60,
      ContentType: 'text/csv'
    }

    const urlResult = await s3.getSignedUrlPromise('putObject', params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(urlResult),
    };
  }
  catch (e) {
    return {
      statusCode: 500,
      message: e.message || 'Something goes wrong'
    }
  }
}