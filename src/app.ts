import express from "express";
import helmet from "helmet";
import {player_router} from './apis/player';
import dotenv from 'dotenv';
dotenv.config();
import connection from "./connection/connection";

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(helmet());

app.use('/player', player_router)

const start = async (): Promise<void> => {
    try {
      await connection.authenticate();
      app.listen(3000, () => {
        console.log(`Server started on localhost:${PORT} 3000`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
void start();