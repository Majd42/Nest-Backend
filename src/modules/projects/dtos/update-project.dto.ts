
import { IsMongoId, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    title: string;


    @IsString()
    @IsOptional()
    description: string;


    @IsString()
    @IsOptional()
    tech: string

    // @IsMongoId()
    // @IsOptional()
    // developer_id: string
}