import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator"
import { ExperienceType } from "src/modules/shared/types"

export class UpdateExperienceDto {
     @IsString()
     @IsOptional()
    name: string


    @IsString()
    @IsOptional()
    place: string

    @IsString()
    @IsOptional()
    description: string

    @IsEnum(ExperienceType)
    @IsOptional()
    type: ExperienceType

    @IsDateString()
    @IsOptional()
    from_date: Date


    @IsDateString()
    @IsOptional()
    to_date: Date
}