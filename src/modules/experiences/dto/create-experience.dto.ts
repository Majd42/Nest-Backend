import { IsDate, IsDateString, IsEnum, IsString } from "class-validator";
import { ExperienceType } from "src/modules/shared/types";

export class CreateExperienceDto {
    @IsString()
    name: string


    @IsString()
    place: string

    @IsString()
    description: string

    @IsEnum(ExperienceType)
    type: ExperienceType

    @IsDateString()
    from_date: Date


    @IsDateString()
    to_date: Date

}