import { Types } from "mongoose";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

export type IRemark = {
    _id: Types.ObjectId,
    remark: string,
    lead: ILead,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TRemarkBody = Request['body'] & IRemark;


export type ILead = {
    _id: Types.ObjectId,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: string,
    email: string
    city: string,
    state: string,
    country: string,
    address: string,
    remarks: IRemark[],
    work_description: string,
    turnover: string,
    lead_type: "wholesale" | "retail" | "company" | "mixed"
    stage: "open" | "won" | "won dealer" | "lost" | "useless" | "potential"
    alternate_mobile1: string,
    alternate_mobile2: string,
    alternate_email: string,
    lead_owners: IUser[],
    organization: IOrganization
    lead_source: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TLeadBody = Request['body'] & ILead;
