import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"; 
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
   
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const secret = this.configService.get<string>('JWT_SECRET'); 
     
            const payload = await this.jwtService.verifyAsync(token, {
                secret: secret,
            });

        
            request.user = payload;

            return true; 
        } catch (error) {
            throw new UnauthorizedException('Invalid token'); 
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.headers.authorization?.split(" ")[1];
        return token;
    }
}
