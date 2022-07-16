import { handler } from '../src/functions/getProductList';
import * as jsonReader from '../src/utils/jsonReader';
import products from '../src/data/products.json';

describe('getProductList method', () => {
    it('should return array with products', async () => {
        const res = await handler();
        expect(JSON.parse(res.body)).toStrictEqual(products);
        expect(res.statusCode).toBe(200);
    });
    it('should return 404 if no products', async () => {
        jest.spyOn(jsonReader, 'readJSON').mockResolvedValue(null);
        const res = await handler();
        expect(res.statusCode).toBe(404);
    });
})