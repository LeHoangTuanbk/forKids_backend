import { Player} from "../models/Player";
import {Request, Response, NextFunction} from 'express';

const is_duplicated_user =async (req : Request,res : Response, next: NextFunction) => {
    const {user_name} = req.body;

    let user = null;
    user = await Player.findOne({
        where: {
            user_name,
        }
    })
    if(user)
    {
        return res.status(409).send({message: "Username existed"});
    }
    next();
}

export {is_duplicated_user}