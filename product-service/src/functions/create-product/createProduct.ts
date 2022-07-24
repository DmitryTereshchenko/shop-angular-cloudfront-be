import {lambdaWrapper} from "@libs/lambdaWrapper";
import {createProduct} from "@services/productService";
import {middyfy} from "@libs/lambda";
import {Product} from "@models/product";

const handler = lambdaWrapper(({ body }: { body: Product }) => {
  return createProduct(body);
});

export const main = middyfy(handler);