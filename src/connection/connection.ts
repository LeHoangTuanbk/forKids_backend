import { Sequelize } from "sequelize-typescript";
import { Player } from "../models/Player";
import dotenv from 'dotenv';
dotenv.config();

const config = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  models: [Player],
};

//@ts-ignore
const connection = new Sequelize(config);

export default connection;