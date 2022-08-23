import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/catalogBatchProcess.handler`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: 'arn:aws:sqs:eu-west-1:073199102284:catalogItemsQueue'
      }
    }
  ]
}