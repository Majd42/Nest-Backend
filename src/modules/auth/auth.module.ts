import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "../shared/guards/auth.guard";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports:[ UsersModule, JwtModule.registerAsync({
       imports: [ConfigModule],
       useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        
       }),
       inject: [ConfigService]
    })],
    controllers:[AuthController],
    providers:[AuthGuard, AuthService],
    
})
export class AuthModule{}