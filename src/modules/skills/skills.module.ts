import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from 'src/schemas/skill.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name: Skill.name, schema: SkillSchema}]), AuthModule],
  controllers: [SkillsController],
  providers: [SkillsService, AuthGuard, JwtService],
})
export class SkillsModule {}
