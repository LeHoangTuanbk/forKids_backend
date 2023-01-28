import express, {Request, Response} from "express";
import helmet from "helmet";
import {player_router} from './apis/player';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());

app.use('/player', player_router)

app.listen(PORT, ()=> {
    console.log(`App is running at localhost:${PORT}`)
})
