import {lambdaWrapper} from "@libs/lambdaWrapper";
import {APIGatewayProxyEvent} from 'aws-lambda';
import {getProductById} from "@services/productService";
import {middyfy} from "@libs/lambda";

const handler = lambdaWrapper((event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  return getProductById(productId);
});

export const main = middyfy(handler);