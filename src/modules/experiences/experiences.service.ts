import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Experience } from "src/schemas/experience.schema";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { GetExperiencesDto } from "./dto/get-experiences.dto.ts";
import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { ExperienceType } from "../shared/types";
import { GetUserExperiencesDto } from "./dto/get-user-experiences.dto";


@Injectable()
export class ExperiencesService {
    constructor(@InjectModel(Experience.name) private experienceModel : Model<Experience>){}

    async createExperiencesService(createExperienceDto: CreateExperienceDto, userId:string) {
        try {
            const experience  = new this.experienceModel({
                ...createExperienceDto,
                user_id: userId
            })

            await experience.save()
            return experience
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Internal server error", error)
        }
    }



    async getExperiencesByTypeService(getUserExperiencesDto: GetUserExperiencesDto) {
         try {
            const {email, type } = getUserExperiencesDto
            const experiences = await this.experienceModel.find({type}).populate({
                path:'user_id',
                match: {email}
            })

            return experiences
         } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Internal server error", error)
         }
    }
      async getExperiences(getExperiencesDto: GetExperiencesDto, userId) {
         try {
            
            const experiences = await this.experienceModel.find({type: getExperiencesDto.type, user_id: userId})

            return experiences
         } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Internal server error", error)
         }
    }


    async deleteExperienceByIdService(id: string) {
        try {
            const deletedExp = await this.experienceModel.findOneAndDelete({_id: id})
            return deletedExp
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Internal server error", error)
        }
    }


    async updateExperienceService(updateExperienceDto: UpdateExperienceDto, id: string) {
        try {
            const findExp = await this.experienceModel.findById(id)

            if(!findExp) {
                throw new NotFoundException('experience not found')
            }
            Object.assign(findExp, updateExperienceDto)

            await findExp.save() 
            return findExp
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Internal server error", error)
        }
    }
}