import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { MotherboardIDName, ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { MotherboardCreateDto } from "./model/motherboard.dto.create";
import { MotherboardDeleteDto } from "./model/motherboard.dto.delete";
import { MotherboardUpdateDto } from "./model/motherboard.dto.update";
import { Motherboard } from "./model/motherboard.entity";
import { MotherboardService } from "./motherboard.service";

@ApiTags('Motherboard')
@Controller({
    path: 'motherboard',
    version: '1'
})
export class MotherboardController {
    @Inject(MotherboardService)
    private readonly service: MotherboardService;

    // kreiraj maticnu
    @ApiBody({ type: MotherboardCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newMotherboard(
        @Body() body: MotherboardCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<Motherboard>> {
        let response: ServerResponse<Motherboard> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newMotherboard(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update motherboard
    @ApiBody({ type: MotherboardUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async editMotherboard(
        @Body() body: MotherboardUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<Motherboard>> {
        let response: ServerResponse<Motherboard> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editMotherboard(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete motherboard
    @ApiBody({ type: MotherboardDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deleteMotherboard(
        @Body() body: MotherboardDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteMotherboard(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vraca naslove i ID-jeve
    @Get('all')
    public async getAllMotherboards() : Promise<ServerResponse<MotherboardIDName[]>> {
        let response: ServerResponse<MotherboardIDName[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getAllMotherboards();
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati maticnu preko id-a
    @Get(':id')
    public async getMotherboard(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<ServerResponse<Motherboard>> {
        let response: ServerResponse<Motherboard> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getMotherboard(id);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }
}