import { Product } from "../models/product";
import products from '../data/products.json';

export const readJSON = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(products);
    }
    catch(e) {
      reject(e.message);
    }
  });
}