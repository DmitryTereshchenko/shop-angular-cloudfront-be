import type { AWS } from '@serverless/typescript';

import getProductList from '@functions/get-products-list';
import getProductById from "@functions/get-product-by-id";
import createProduct from '@functions/create-product';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-webpack',
    'serverless-auto-swagger'
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DB: '${env:PG_DB}',
      PG_USERNAME: '${env:PG_USERNAME}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
    }
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct },
  package: { individually: true },
  custom: {
    webpackConfig: './webpack.config.js',
    autoswagger: {
      typefiles: ['./src/models/product.ts'],
      title: 'This is API for Product Service'
    }
  },
};

module.exports = serverlessConfiguration;
