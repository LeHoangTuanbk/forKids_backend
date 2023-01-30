import { randomUUID } from "crypto";
import {Table, Model, Column, DataType} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "players",
})
class Player extends Model {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: randomUUID
    })
    player_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    user_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    admin?: boolean;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: true,
    })
    points: number[];

}

export {Player};