import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/importFileParser.handler`,
  events: [
    {
      s3: {
        bucket: 'angular-shop-bucket-uploaded',
        event: 's3:ObjectCreated:*',
        existing: true
      }
    }
  ]
}