import {handlerPath} from "@libs/handler-resolver";

export default {
 handler: `${handlerPath(__dirname)}/getProductById.main`,
 events: [
   {
     http: {
       method: 'get',
       path: '/products/{productId}',
       swaggerTags: ['Products'],
       responses: {
         200: {
           description: 'Return single product',
           bodyType: 'Product'
         }
       }
     }
   }
 ]
}