import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "./user.schema";


export type ProjectDocument = HydratedDocument<Project>
@Schema({timestamps: true})
export class Project {
    @Prop({
        required: true
    })
    title: string

    @Prop({
        required: true
    })
    image_url: string

    @Prop({
        required: true
    })
    description: string 

    @Prop({
        required: true,
    })
    tech: string


    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    })
    developer_id: User
    
}


export const ProjectSchema = SchemaFactory.createForClass(Project)