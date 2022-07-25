import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/getProductsList.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/products',
        swaggerTags: ['Products'],
        responses: {
          200: {
            description: 'Return array of product',
            bodyType: 'Product'
          }
        }
      },
    },
  ],
};
