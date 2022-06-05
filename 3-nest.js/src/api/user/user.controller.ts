import { Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "./auth/auth.guard";
import { UserUpdateDto } from "./model/user.dto.update";
import { User } from "./model/user.entity";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller({
    path: 'user',
    version: '1'
})
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @ApiBody({ type: UserUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async updateUser(
        @Body() body: UserUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<User>> {
        let response: ServerResponse<User> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.updateUser(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }
}