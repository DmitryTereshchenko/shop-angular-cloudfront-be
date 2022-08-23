import * as AWS from 'aws-sdk';
const csv =  require('csv-parser');

const BUCKET = 'angular-shop-bucket-uploaded';
const s3 = new AWS.S3({ region: 'eu-west-1' });
const sqs = new AWS.SQS();

export const handler = async (event) => {
  try {
    for (const record of event.Records) {
      const s3Stream = s3.getObject({
        Bucket: BUCKET,
        Key: record.s3.object.key
      }).createReadStream();

      let products = [];

      s3Stream.pipe(csv())
        .on('data', async (data) => {
          products.push(data);
        })
        .on('end',  () => {
          products.forEach(async (product) => {
            console.log('Product:', product);
            await sqs.sendMessage({
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(product)
            }).promise();
          });
        });

        console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

          await s3.copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${record.s3.object.key}`,
            Key: record.s3.object.key.replace('uploaded', 'parsed')
          }).promise();

          await s3.deleteObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
          }).promise();

          console.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`)
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      message: e.message || 'Something goes wrong'
    };
  }
}