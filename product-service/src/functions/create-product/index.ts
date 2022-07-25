import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/createProduct.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/products',
        swaggerTags: ['Products'],
        bodyType: 'Product'
      }
    }
  ]
}