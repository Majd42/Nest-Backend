import { IsEmail } from "class-validator";

export class GetDeveloperSkillsDto {
    @IsEmail()
    email: string

    
}