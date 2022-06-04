import { Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { User } from "../model/user.entity";
import { JwtAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./model/auth.dto.login";
import { AuthRegisterDto } from "./model/auth.dto.register";

@ApiTags('Auth')
@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @ApiBody({ type: AuthRegisterDto })
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(
        @Body() body: AuthRegisterDto
    ) : Promise<User | never> {
        return this.service.register(body);
    }

    @ApiBody({ type: AuthLoginDto })
    @Post('login')
    private login(
        @Body() body: AuthLoginDto
    ) : Promise<string | never> {
        return this.service.login(body);
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    private refresh(
        @Req() { user } : Request
    ) : Promise<string | never> {
        return this.service.refresh(user as User);
    }
}