import { IsEmail } from "class-validator";

export class GetDeveloperProjectsDto {
    @IsEmail()
    email: string
}