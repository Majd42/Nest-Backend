import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { GetUserDto } from "./dto/get-user-dto";
import { AuthGuard } from "../shared/guards/auth.guard";
import { UsersService } from "./users.service";



@Controller('/users')
export class UsersController{

    constructor(private readonly usersService: UsersService){}

    @Get('/getUser') 
    @UseGuards(AuthGuard)
    getUserByEmail( @Request() req){
        
        return this.usersService.getUserById(req.user.id)
    }


    @Get('/')
    getsom() {
        return 'get some'
    }
}

