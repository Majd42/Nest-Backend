import { IsMongoId, IsString } from "class-validator";



export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    tech: string

    // @IsMongoId()
    // developer_id: string
}