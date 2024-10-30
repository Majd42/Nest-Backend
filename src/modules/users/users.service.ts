import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import * as bcrypt from 'bcrypt'
import saveFile from "src/helpers/saveFile";
import { SignupDto } from "../auth/dto/signup.dto";
import { GetUserDto } from "./dto/get-user-dto";


@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) private userModel : Model<User>, ){}

  

    async getUserByEmailService(email: string):Promise<UserDocument> {
        
            const user = await this.userModel.findOne({email})
            if(!user) {
               
                throw  new NotFoundException("user not found")
            }

            return user 
        
        
      
    }


    async createUserService(signupDto: SignupDto,hash: string, image: Express.Multer.File) {
     
     
            
            const existingUser = await this.userModel.findOne({email: signupDto.email})

            if(existingUser) {
                throw new BadRequestException("user already exists")
              
            }
            const user = new this.userModel({
                email: signupDto.email,
                password: hash,
                about: signupDto.about,
                age: signupDto.age,
                phone: signupDto.phone
                
            })
            if (image) {
                user.image_url = saveFile(image)
            }
            await user.save()
            return user
        
    }


    async getUserById(userId: string) {
        const user = await this.userModel.findById(userId)
    
        if(!user) {
            throw new NotFoundException('user not found')
        }

        return user
    }
}