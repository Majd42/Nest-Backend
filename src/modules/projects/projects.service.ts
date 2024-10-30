import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "src/schemas/project.schema";
import { CreateProjectDto } from "./dtos/create-project.dto";

import { UpdateProjectDto } from "./dtos/update-project.dto";
import saveFile from "src/helpers/saveFile";
import { GetDeveloperProjectsDto } from "./dtos/get-developer-projects.dto";


@Injectable()
export class ProjectsService {
   constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) {}


   async getProjects (): Promise<Project[]> {
    try {
      
        const projects = await this.projectModel.find()
        return projects
    } catch (error) {
        console.log(error)
        throw new InternalServerErrorException('Failed to retrieve projects')
    }
   }


   async createProjectService(createProjectDto: CreateProjectDto, image: Express.Multer.File, userId: string) {
 
    try {
              const fileName = saveFile(image)
        const newProject = new this.projectModel({
            ...createProjectDto,
            developer_id: userId,
            image_url: fileName
        }) 

        await newProject.save()
        return newProject     
    } catch (error) {
        console.log(error)
        throw new InternalServerErrorException('Failed to add the project', error)
    }
   }

 async deleteProjectByIdService(id: string): Promise<Project> {
    try {
     

     
        const projectToDelete = await this.projectModel.findById(id);


        if (!projectToDelete) {
            throw new NotFoundException("Project not found");
        }

        await this.projectModel.deleteOne({ _id: projectToDelete.id });
        return projectToDelete;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new InternalServerErrorException('Failed to delete the project');
    }
}


   

    async updateProjectService(id: string, updateProjectDto: UpdateProjectDto, image: Express.Multer.File): Promise<Project> {
        try{
            const existingProject = await this.projectModel.findById(id);

    if (!existingProject) {
      throw new NotFoundException('Project not found');
    }

    Object.assign(existingProject, updateProjectDto);
  
 
    if (image) {

        const fileName = saveFile(image)
        existingProject.image_url = fileName; 
      
    }

    await existingProject.save();
    return existingProject;
        }
    catch(error) {
        console.log(error)
        throw new InternalServerErrorException("failed to update project")
    }
  }




  async getDeveloperProjectsById(userId: string) {
    try {
     
        const projects = await this.projectModel.find({developer_id: userId})

        return projects
    } catch (error) {
                console.log(error)
        throw new InternalServerErrorException("failed to update project")
    }
  }

  async getDeveloperProjectsByEmailService(getDeveloperProjectsDto : GetDeveloperProjectsDto) {
    try {
        const { email } = getDeveloperProjectsDto
        const projects = await this.projectModel.find().populate({
            path: 'developer_id',
            match: {email}
        })

        return projects
    } catch (error) {
                console.log(error)
        throw new InternalServerErrorException("failed to update project")
    }
  }
}