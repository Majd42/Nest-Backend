import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";


export type SkillDocument = HydratedDocument<Skill>

@Schema({
    timestamps: true
})
export class Skill { 
    @Prop({
        required: true
    })
    name: string

    @Prop({
        required:true,
        min:0,
        max: 100
    })
    percentage: number

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       required: true
    })
    user_id: User

}


export const SkillSchema = SchemaFactory.createForClass(Skill)