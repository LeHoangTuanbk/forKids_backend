import express from "express";
import helmet from "helmet";
import connection from "./connection/connection";
import {player_router} from './apis/player';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(helmet());

app.use('/player', player_router)

const start = async (): Promise<void> => {
    try {
      await connection.sync();
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  void start();