import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Experience, ExperienceSchema } from "src/schemas/experience.schema";
import { ExperiencesController } from "./experiences.controller";
import { ExperiencesService } from "./experiences.service";
import { AuthModule } from "../auth/auth.module";
import { AuthGuard } from "../shared/guards/auth.guard";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports:[MongooseModule.forFeature([{name: Experience.name, schema: ExperienceSchema}]), AuthModule],
    controllers: [ExperiencesController],
    providers:[ExperiencesService, AuthGuard, JwtService], 

})
export class ExperiencesModule {}