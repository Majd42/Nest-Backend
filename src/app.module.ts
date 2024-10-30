import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ProjectModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { SkillsModule } from './modules/skills/skills.module';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';



@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true
  
    }),
    MongooseModule.forRootAsync(({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DATABASE_URL")
      }),
 
    })),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
    
      }),

        ProjectModule,
        AuthModule,
        ExperiencesModule,
        SkillsModule,
        UsersModule
       
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
