import {Request, Response, NextFunction} from 'express';
import jwt, { Secret, JwtPayload, Algorithm  } from 'jsonwebtoken';
import {Player} from '../models/Player';

const verify_user = async (req : Request,res : Response, next: NextFunction) =>{
    const token = req.header('Authorization')?.replace('Bearer ','');
    if(!token)
    {
        return res.status(401).send("Unauthorized!");
    }
    const SECRET_KEY: Secret = process.env.JWT_PRIVATE_KEY as string;
    const payload = await jwt.verify(token,SECRET_KEY);
    const { data } : any = payload;
    const player : Player | null = await Player.findOne({
        where : data
    })

    if (player !== null)
    {
        req.body.user_name = player.user_name;
        next();
    }
    else return res.status(401).send("Unauthorized!");
}

export {verify_user};

/*
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfbmFtZSI6InR1YW5saCIsInBhc3N3b3JkIjoidHVhbmxoIn0sImlhdCI6MTY3NTE1MzgyMSwiZXhwIjoxNjc3NzQ1ODIxfQ.ITY5KzewsuIDK7lQNRXUn0ARbOrToU31BBd_z05H0h87F5extkI-fyBGlxjIjMhpoyOTcxo3SjJ-Uyrp4KwmsA
*/