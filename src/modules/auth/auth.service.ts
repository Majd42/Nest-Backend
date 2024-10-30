import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { User } from "src/schemas/user.schema";
import { SignupDto } from "./dto/signup.dto";



@Injectable()
export class AuthService {
    constructor(private userService : UsersService,private jwtService: JwtService) {}

    async signInService (email: string, password: string): Promise<{token: string, user: User}> {
       
          
            const user = await this.userService.getUserByEmailService(email)

           
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                throw new UnauthorizedException("invalid credentials")
            }
            
            const token =  this.jwtService.sign({email: user.email, id: user._id})

            return {
                token,
                user
            }
         
    }


    async signupService(signupDto: SignupDto, image: Express.Multer.File): Promise<User>{
       
         const hash = await bcrypt.hash(signupDto.password,10)   
         const user= await this.userService.createUserService(signupDto, hash, image)
         
         return user
        
    }


}
