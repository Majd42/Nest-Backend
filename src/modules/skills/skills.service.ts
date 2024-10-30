import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from 'src/schemas/skill.schema';
import { Model } from 'mongoose';
import { GetDeveloperSkillsDto } from './dto/get-developer-skills.dto';

@Injectable()
export class SkillsService {

  constructor(@InjectModel(Skill.name) private readonly skillModel: Model<Skill>){}

  async createSkillService(createSkillDto: CreateSkillDto, userId: string) {
    try {
      const skill = new this.skillModel({
        ...createSkillDto,
        user_id: userId
      })
      await skill.save()
      return skill
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("internal server error")
    }
  }

  async getSkillsService(userId: string) {
    try {
      const skills = await this.skillModel.find({user_id: userId})

      return skills
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("internal server error")
    }
  }

 

  async updateSkillService( updateSkillDto: UpdateSkillDto, id: string) {

    
      const existSkill = await this.skillModel.findOne({_id: id})
      if(!existSkill) {
        throw new NotFoundException("skill not found")
      }
      Object.assign(existSkill, updateSkillDto)
      await existSkill.save()
      return existSkill
     
  }

  async deleteSkillService(id: string) {
    try {
      const deletedSkill = await this.skillModel.findOneAndDelete({_id:id})
      return deletedSkill
    } catch (error) {
            console.log(error)
      throw new InternalServerErrorException("internal server error")
    }
  }



  async getSkillsByEmailService(getDeveloperSkillsDto: GetDeveloperSkillsDto) {

    const {email} = getDeveloperSkillsDto

    const skills = await this.skillModel.find().populate({
      path: "user_id",
      match: {email}
    })

    return skills
  }
}
