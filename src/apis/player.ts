import express, {Request, Response} from "express";
import { Player } from "../models/Player";

const player_router = express.Router();

player_router.post("/signin",async (req: Request, res: Response) : Promise<Response> => {
    let player_infor = req.body;
    console.log(player_infor);
    const player: Player = await Player.create({...player_infor});
    return res.status(201).json({
        player
    });
    // return res.status(200);
})

player_router.post("/login", async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;
    console.log(user);
    return res.status(201).json(user);
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