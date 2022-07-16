import { handler } from '../src/functions/getProductById';
import { Product } from "../src/models/product";

describe('GetProductById method', () => {
  it('Should return correct value', async () => {
    const obj: Product = {
        "id": "1",
        "title": "Grand Theft Auto V",
        "description": "Grand Theft Auto V",
        "price": 100,
        "count": 1,
        "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        "publisher": "Rockstar Games",
        "releaseYear": 2013
    };
    const mockRequest = {
      pathParameters: {
        productId: '1'
      }
    };
    const res = await handler(mockRequest);
    expect(JSON.parse(res.body)).toEqual(obj);
    expect(res.statusCode).toBe(200);
  });
  it('Should return error if not found object', async () => {
    const mockRequest = {
      pathParameters: {
        productId: '510'
      }
    };
    const res = await handler(mockRequest);
    expect(res.statusCode).toBe(404);
  })
})