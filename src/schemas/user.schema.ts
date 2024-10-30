import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({
    timestamps: true,

})
export class User {


    @Prop({
        required: true,
        unique: true
    })
    email: string
    

    @Prop({
        required: true
    })
    password: string


    @Prop() 
    image_url: string

    @Prop({
        required: true
    }) 
    age: number

    @Prop({
        required: true
    })
    phone: string

    @Prop()
    about: string

    
}

export const UserSchema = SchemaFactory.createForClass(User)