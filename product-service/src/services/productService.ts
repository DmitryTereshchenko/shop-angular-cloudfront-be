import {createConnection} from '@libs/dbHelper';
import {Product} from "@models/product";
import {HttpError, HttpStatus} from "@libs/httpError";

export const getProductsList = async () => {
  const client = createConnection();
  await client.connect();

  try {
    const { rows: products } = await client.query(`select * from products left join stocks on products.id = stocks.product_id`);
    return products;
  }
  catch (e) {
    throw new HttpError(HttpStatus.SERVER_ERROR, e.message);
  }
  finally {
    await client.end();
  }
}

export const getProductById = async (productId: string) => {
  const client = createConnection();
  await client.connect();

  try {
    const {rows: product} = await client.query(`select * from products 
    left join stocks on products.id = stocks.product_id where id='${productId}'`);

    if (!product.length) {
      throw new HttpError(HttpStatus.NOT_FOUND, `Product with id = ${productId} not found`);
    }

    return product;
  } catch (e) {
    throw new HttpError(e.statusCode, e.message);
  } finally {
    await client.end();
  }
}

export const createProduct = async (product: Omit<Product, 'id'>) => {
  const client = createConnection();
  await client.connect();

  try {
    await client.query('BEGIN');
    const { title, description, price, publisher, image } = product;

    if (title === undefined ||
      description === undefined ||
      price === undefined ||
      publisher === undefined ||
      image === undefined
    ) {
      throw new HttpError(HttpStatus.INVALID_BODY, 'Product is invalid');
    }

    const { rows: products } = await client.query(`insert into products (title, description, price, publisher, image)
       values ('${title}', '${description}', ${price}, '${publisher}', '${image}') returning id`);

    const productId = products[0].id;

    const { rows: stocks } = await client.query(`insert into stocks (product_id, count)
       values ('${productId}', 10)`);


    await client.query('COMMIT');

    return { productId };
  }
  catch (e) {
    await client.query('ROLLBACK');
    throw new HttpError(e.statusCode, e.message);
  }
  finally {
    await client.end();
  }
}