import { IsNumber, IsString } from "class-validator"


export class SignupDto {
    @IsString()
    email: string

    @IsString()
    password: string

    @IsString()
    age: string

    @IsString()
    phone: string

    @IsString()
    about: string
}