import { IsEmail, IsEnum, IsString } from "class-validator";
import { ExperienceType } from "src/modules/shared/types";

export class GetUserExperiencesDto {
    @IsEmail()
    email: string

    @IsEnum(ExperienceType)
    type: ExperienceType
}