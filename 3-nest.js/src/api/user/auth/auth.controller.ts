import { Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ServerResponse } from "src/interfaces";
import { User } from "../model/user.entity";
import { JwtAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./model/auth.dto.login";
import { AuthRegisterDto } from "./model/auth.dto.register";

export interface UserWithToken extends User { token: string; }

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
    public async register(
        @Body() body: AuthRegisterDto
    ) : Promise<ServerResponse<User>> {
        let response: ServerResponse<User> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.register(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    @ApiBody({ type: AuthLoginDto })
    @Post('login')
    public async login(
        @Body() body: AuthLoginDto
    ) : Promise<ServerResponse<UserWithToken>> {
        let response: ServerResponse<UserWithToken> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.login(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    public async refresh(
        @Req() { user } : Request
    ) : Promise<ServerResponse<string>> {
        let response: ServerResponse<string> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.refresh(user as User);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }
}