import { Player } from "../models/Player";

import connection from "../connection/connection";

const refresh_seed = async(): Promise<void> => {
    await connection.drop();
    console.log("All tables dropped!");
    
    await connection.sync();
    
    let dummy_data = [
        {
            "user_name" : "admin",
            "password" : "admin",
            "admin" : true,
        },
        {
            "user_name" : "tuanlh",
            "password" : "tuanlh",
        }
    ]
    for(let item of dummy_data)
    {
        await Player.create({...item});
    }
    console.log("Seeded!");
}

refresh_seed();

