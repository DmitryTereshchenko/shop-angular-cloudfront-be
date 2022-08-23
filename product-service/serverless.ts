import type { AWS } from '@serverless/typescript';

import getProductList from '@functions/get-products-list';
import getProductById from "@functions/get-product-by-id";
import createProduct from '@functions/create-product';
import createBatch from '@functions/catalog-batch-process';

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
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: ['arn:aws:sqs:eu-west-1:073199102284:catalogItemsQueue']
      },
      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: {
          Ref: 'SNSTopic'
        }
      }
    ],
    environment: {
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DB: '${env:PG_DB}',
      PG_USERNAME: '${env:PG_USERNAME}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
      SNS_URL: {
        Ref: 'SNSTopic'
      }
    }
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct, createBatch },
  package: { individually: true },
  resources: {
    Resources: {
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'dima.tereshchenko.96@mail.ru',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            'publisher': [{"anything-but": "Valve"}],
          }
        }
      },
      SNSSubscriptionFiltering: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'dima.tereshchenko.96@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            'publisher': ['Valve'],
          }
        }
      }
    }
  },
  custom: {
    webpackConfig: './webpack.config.js',
    autoswagger: {
      typefiles: ['./src/models/product.ts'],
      title: 'This is API for Product Service'
    }
  },
};

module.exports = serverlessConfiguration;
