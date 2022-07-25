import { getProductsList } from "@services/productService";
import { lambdaWrapper } from "@libs/lambdaWrapper";
import {APIGatewayProxyEvent} from "aws-lambda";
import {middyfy} from "@libs/lambda";

const handler = lambdaWrapper((event: APIGatewayProxyEvent) => {
    return getProductsList();
});

export const main = middyfy(handler);