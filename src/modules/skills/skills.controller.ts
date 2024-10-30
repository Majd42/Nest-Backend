import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GetDeveloperSkillsDto } from './dto/get-developer-skills.dto';

@UseGuards(AuthGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('/create')
  createSkill(@Body() createSkillDto: CreateSkillDto, @Request() req) {
    return this.skillsService.createSkillService(createSkillDto, req.user.id)
  }

  @Get('')
  getSkills(@Request() req) {
    return this.skillsService.getSkillsService(req.user.id);
  }


  @Put(':id')
  updateSkill(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.updateSkillService( updateSkillDto, id);
  }

  @Delete(':id')
  deleteSkill(@Param('id') id: string) {
    return this.skillsService.deleteSkillService(id);
  }


  @Post('/developer')
  getSkillsByEmail(@Body() getDeveloperSkillsDto: GetDeveloperSkillsDto) {
    this.skillsService.getSkillsByEmailService(getDeveloperSkillsDto)
  }
}
