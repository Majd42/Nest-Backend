import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";
import { ExperienceType } from "src/modules/shared/types";


export type ExperienceDocument = HydratedDocument<Experience>

@Schema({
    timestamps: true
})
export class Experience {

    @Prop({
        required: true
    })
    name: string

    @Prop({
        required: true
    })
    place: string

    @Prop({
        reqiured:true
    })
    description: string

    @Prop({
        enum: ExperienceType,
        required: true
    })
    type: ExperienceType

    @Prop({
        required: true
    })
    from_date: Date

    @Prop({
        required: true
    })
    to_date: Date

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    user_id: User
}


export const ExperienceSchema = SchemaFactory.createForClass(Experience)