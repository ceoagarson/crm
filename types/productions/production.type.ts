import { Types } from "mongoose"
import { IUser } from "../users/user.type"
import { IMachine } from "./machine.types"

export type IProduction = {
    _id: Types.ObjectId,
    production: string
    machine: IMachine,
    created_at:Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TProductionBody = Request['body'] & IProduction;