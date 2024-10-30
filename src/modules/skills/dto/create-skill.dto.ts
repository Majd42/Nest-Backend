import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateSkillDto {
    @IsString()
    name: string

    @IsNumber()
    @Min(0)
    @Max(100)
    percentage: number

    
}
