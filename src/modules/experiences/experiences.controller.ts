import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ExperiencesService } from "./experiences.service";
import { AuthGuard } from "../shared/guards/auth.guard";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { GetExperiencesDto } from "./dto/get-experiences.dto.ts";
import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { ExperienceType } from "../shared/types";
import { GetUserExperiencesDto } from "./dto/get-user-experiences.dto";

    
@Controller('/experiences')
export class ExperiencesController {
    constructor(private readonly experiencesService: ExperiencesService){}

    @Post('create')
    @UseGuards(AuthGuard)
    createExperience(@Body() createExperienceDto: CreateExperienceDto, @Request() req) {
        return this.experiencesService.createExperiencesService(createExperienceDto, req.user.id)
    }


    @Post('/developer')

    getExperiencesByType(@Body() getUserExperiencesDto: GetUserExperiencesDto) {
     
        return this.experiencesService.getExperiencesByTypeService(getUserExperiencesDto)
    }

    @Get('')
    @UseGuards(AuthGuard)
    getExperiences(@Body() getExperiencesDto: GetExperiencesDto, @Request() req) {
     
        return this.experiencesService.getExperiences(getExperiencesDto, req.user.id)
    }


    @Put(':id')
    @UseGuards(AuthGuard)
    updateExperience(@Body() updateExperienceDto: UpdateExperienceDto, @Param('id') id: string){
        return this.experiencesService.updateExperienceService(updateExperienceDto, id)
    }


    @Delete(':id') 
    @UseGuards(AuthGuard)
    deleteExperience(@Param('id') id: string){
        return this.experiencesService.deleteExperienceByIdService(id)
    }
}
