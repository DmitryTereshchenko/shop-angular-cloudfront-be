import {Client, ClientConfig} from 'pg';

const { PG_HOST, PG_PORT, PG_DB, PG_USERNAME, PG_PASSWORD } = process.env;

const dbClient: ClientConfig = {
  host: PG_HOST,
  port: +PG_PORT,
  database: PG_DB,
  user: PG_USERNAME,
  password: PG_PASSWORD
}

export const createConnection = () => {
  return new Client(dbClient);
}