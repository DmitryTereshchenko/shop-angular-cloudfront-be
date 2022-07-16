import { readJSON, successResponse, failResponse } from '../utils';
import { Product } from "../models/product";

export const handler = async () => {
  try {
    const products: Product[] = await readJSON();

    if(!products) {
      return failResponse('File not found', 404);
    }

    return successResponse(products);
  }
  catch (e) {
    return failResponse(e.message);
  }
};