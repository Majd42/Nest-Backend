import { Body, Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { SigninDto } from "./dto/signin.dto";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/schemas/user.schema";



@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signin')
     signin(@Body() signinDto: SigninDto): Promise<{token: string, user: User}> {

        return this.authService.signInService(signinDto.email, signinDto.password)
    }


    @Post('/signup')
    @UseInterceptors(FileInterceptor('image'))
     signup(@Body() signupDto: SignupDto, @UploadedFile(new ParseFilePipe({
        fileIsRequired: false
    })) image: Express.Multer.File) {
        console.log(signupDto)
        return this.authService.signupService(signupDto, image )
    }
}
