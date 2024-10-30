import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { Project } from "src/schemas/project.schema";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { AuthGuard } from "../shared/guards/auth.guard";
import { GetDeveloperProjectsDto } from "./dtos/get-developer-projects.dto";

  
@Controller('/projects')
export class ProjectsController {
    constructor(private readonly projectService : ProjectsService) {}
    @Get()
    getAllProjects():Promise<Project[]>{
        return this.projectService.getProjects()
    }

  @UseGuards(AuthGuard)
    @Post('/create')
    
    @UseInterceptors(FileInterceptor('image'))

    createProject( @Body() createProjectDto: CreateProjectDto, @UploadedFile( new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 10000000}),
            // new FileTypeValidator({fileType: "image/jpg"})
        ]
    })) image : Express.Multer.File, @Request() req) {
    
        return this.projectService.createProjectService(createProjectDto, image, req.user.id)
    }


      @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProjectById(@Param('id') id: string):Promise<Project> {
        return this.projectService.deleteProjectByIdService(id)
    }

      @UseGuards(AuthGuard)
    @Put(':id')

    @UseInterceptors(FileInterceptor('image'))
    updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @UploadedFile(new ParseFilePipe({
        fileIsRequired: false
    }))image: Express.Multer.File, @Request() req):Promise<Project>{
        return this.projectService.updateProjectService(id, updateProjectDto, image)
    }

    
    @Get('')
    @UseGuards(AuthGuard)
    getDeveloperProjects(@Request() req) {
        return this.projectService.getDeveloperProjectsById(req.user.id)
    }

    @Post('/developer/')
  
    getDeveloperProjectsByEmail(@Body() getDeveloperProjectsDto: GetDeveloperProjectsDto) {
        return this.projectService.getDeveloperProjectsByEmailService(getDeveloperProjectsDto)
    }
}