import express, {Request, Response} from "express";
import { Player } from "../models/Player";
import { is_duplicated_user } from "../middlewares/utils";
import { verify_user } from "../middlewares/auth";
import jwt, { Secret, JwtPayload, Algorithm  } from 'jsonwebtoken';

const player_router = express.Router();

player_router.post("/signin",is_duplicated_user, async (req: Request, res: Response) : Promise<Response> => {
    let player_infor = req.body;
    const player: Player = await Player.create({...player_infor});
    return res.status(201).json({
        player
    });
})

player_router.post("/login", async (req: Request, res: Response): Promise<Response> => {
    const {user_name, password} = req.body;
    const player = await Player.findOne({
        where: {
        user_name,
        password
        }
    }) 

    if(player !== null)
    {
        const jwt_obj : JwtPayload = {
            data: {
              user_name,
              password,
            }
        }
        const SECRET_KEY: Secret = process.env.JWT_PRIVATE_KEY as string;
        const token = jwt.sign(jwt_obj, SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_DAYS,
            algorithm: process.env.JWT_HASH_ALGORITHM as Algorithm,
        } )
        return res.send({token:token })
    }

    return res.status(404).send("Username or password is not correct!");
  });

player_router.post("/update_points", verify_user, async (req: Request, res: Response): Promise<Response> => {
    let user_name : string = req.body.user_name;
    //Will be implemented later!
    return res.send(user_name);
});

//These apis are for admin to manage to the system.
player_router.get("/get_all_infor", async (req: Request, res: Response): Promise<Response> => {
    return res.send("Will be implemented later!");
});

player_router.get("/:user_id", async (req: Request, res: Response): Promise<Response> => {
    const {user_id} = req.params;
    return res.send("Will be implemented later!");
});

export {player_router}