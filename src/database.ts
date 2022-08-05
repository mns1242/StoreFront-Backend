import dotenv from 'dotenv'
import { Pool } from "pg"
dotenv.config()
const {
    Postgres_Host,
    Postgres_DB,
    Postgres_user,
    Postgres_password,
    Postgres_DB_test,
    ENV

} = process.env

let database;

if (ENV === 'dev') {
  database = {
    host: Postgres_Host,
    user: Postgres_user,
    password: Postgres_password,
    database: Postgres_DB,
  };
} else if (ENV === 'test') {
  database = {
    host: Postgres_Host,
    user: Postgres_user,
    password: Postgres_password,
    database: Postgres_DB_test,
  };
}

const Client = new Pool(database);



export default Client