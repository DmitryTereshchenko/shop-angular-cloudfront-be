import * as productService from '../services/productService';
import { handler } from "../functions/catalog-batch-process/catalogBatchProcess";
import { SNS } from 'aws-sdk';
import {SQSEvent} from "aws-lambda";
import {Product} from "@models/product";

jest.mock('aws-sdk', () => {
  const mSNS = {
    publish: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return { SNS: jest.fn(() => mSNS) };
});

describe('Create batch', () => {
  let sns;
  beforeAll(() => {
    sns = new SNS();
  });
  it('should create row in DB', async () => {
    const productServiceSpy = jest.spyOn(productService, "createProduct").mockResolvedValue({
      productId: 'test'
    });

    sns.publish().promise.mockResolvedValue('Success');

    const mockProduct = {
      description: 'test',
      image: 'test',
      price: 1,
      title: 'test',
      publisher: 'test'
    } as Product;

    await handler({ Records: [{ body: JSON.stringify(mockProduct) }]} as SQSEvent);
    expect(productServiceSpy).toHaveBeenCalledWith(mockProduct);
    expect(sns.publish).toHaveBeenCalledWith({
      Subject: 'Amazon Publish notifier',
      Message: `Object ${JSON.stringify(mockProduct, null, 2)} was added to database`,
      TopicArn: process.env.SNS_URL,
      MessageAttributes: {
        'publisher': { DataType: 'String', StringValue: mockProduct.publisher }
      }
    });
  });
});