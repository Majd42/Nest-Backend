import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "src/schemas/project.schema";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { AuthGuard } from "../shared/guards/auth.guard";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports: [MongooseModule.forFeature([{name: Project.name, schema:ProjectSchema}]), AuthModule],
    controllers: [ProjectsController],
    providers:[ProjectsService,AuthGuard, JwtService]

})
export class ProjectModule{} 