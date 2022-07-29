import { readJSON, successResponse, failResponse } from '../utils';
import {Product} from "../models/product";

export const handler = async (event) => {
  try {
    const id = event.pathParameters.productId;

    if(!parseInt(id)) {
      return failResponse('Id is not correct', 400);
    }

    const productList: Product[] = await readJSON();

    if(!productList) {
      return failResponse('File not found', 404);
    }

    const currProduct = productList.find(product => product.id === id);

    if (!currProduct) {
      return failResponse(`Item with id = ${id} not found`, 404);
    }

    return successResponse(currProduct);
  }
  catch(e) {
    return failResponse(e.message);
  }
};