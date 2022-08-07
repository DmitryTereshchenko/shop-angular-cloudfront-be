import {SQSEvent} from "aws-lambda";
import {createProduct} from "@services/productService";
import * as AWS from 'aws-sdk';

const sns = new AWS.SNS({ region: 'eu-west-1' });

export const handler = async (event: SQSEvent) => {
  try {
    const products = event.Records.map(({ body }) => JSON.parse(body));
    for (const product of products) {
      console.log('Product:', product);
      const res = await createProduct(product);
      if (res) {
        await sns.publish({
          Subject: 'Amazon Publish notifier',
          Message: `Object ${JSON.stringify(product, null, 2)} was added to database`,
          TopicArn: process.env.SNS_URL,
          MessageAttributes: {
            'publisher': { DataType: 'String', StringValue: product.publisher }
          }
        }).promise();
      }
    }
  }
  catch (e) {
    console.log(e.message);
  }
}