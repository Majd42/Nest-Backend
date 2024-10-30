import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(100)
    percentage: number
}
