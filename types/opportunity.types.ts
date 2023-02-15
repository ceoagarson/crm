import { Types } from "mongoose";
import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";

export interface BaseOpportunity {
    name: string,
    mobile: number
    email: string
}
export interface IOpportunity extends BaseOpportunity {
    _id: Types.ObjectId,
    city?: string,
    state?: string,
    description?: string,
    opportunity_type?: "easy" | "tricky" | "hard"
    opportunity_owner?: Types.ObjectId,
    organization?: Types.ObjectId
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    opportunity_source?: string,
    remarks?: string,
    open?: {status:Boolean,changedBy:Types.ObjectId},
    createdOn?: Date,
    activities?: IActivity[]
}
export type TOpportunityBody = Request['body'] & IOpportunity;
