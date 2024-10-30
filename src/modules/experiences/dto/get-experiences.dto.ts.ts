import { IsEnum } from "class-validator";
import { ExperienceType } from "src/modules/shared/types";

export class GetExperiencesDto {
    @IsEnum(ExperienceType)
    type: ExperienceType
}