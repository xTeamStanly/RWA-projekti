import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { RAMIDName, ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { RAMCreateDto } from "./model/ram.dto.create";
import { RamDeleteDto } from "./model/ram.dto.delete";
import { RAMUpdateDto } from "./model/ram.dto.update";
import { RAM } from "./model/ram.entity";
import { RAMService } from "./ram.service";

@ApiTags('RAM')
@Controller({
    path: 'ram',
    version: '1'
})
export class RAMController {
    @Inject(RAMService)
    private readonly service: RAMService;

    // kreiraj ram
    @ApiBody({ type: RAMCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newRAM(
        @Body() body: RAMCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<RAM>> {
        let response: ServerResponse<RAM> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newRAM(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update ram
    @ApiBody({ type: RAMUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async editRAM(
        @Body() body: RAMUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<RAM>> {
        let response: ServerResponse<RAM> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editRAM(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete ram
    @ApiBody({ type: RamDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deleteRAM(
        @Body() body: RamDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteRAM(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vraca naslove i ID-jeve
    @Get('all')
    public async getAllRAMs() : Promise<ServerResponse<RAMIDName[]>> {
        let response: ServerResponse<RAMIDName[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getAllRAMs();
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati ram preko id-a
    @Get(':id')
    public async getRAM(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<ServerResponse<RAM>> {
        let response: ServerResponse<RAM> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getRAM(id);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

}