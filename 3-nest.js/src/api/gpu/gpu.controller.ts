import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { GPUIDName, ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { GPUService } from "./gpu.service";
import { GPUCreateDto } from "./model/gpu.dto.create";
import { GPUDeleteDto } from "./model/gpu.dto.delete";
import { GPUUpdateDto } from "./model/gpu.dto.update";
import { GPU } from "./model/gpu.entity";

@ApiTags('GPU')
@Controller({
    path: 'gpu',
    version: '1'
})
export class GPUController {
    @Inject(GPUService)
    private readonly service: GPUService;

    // kreiraj gpu
    @ApiBody({ type: GPUCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newCPU(
        @Body() body: GPUCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<GPU>> {
        let response: ServerResponse<GPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newGPU(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update gpu
    @ApiBody({ type: GPUUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async editCPU(
        @Body() body: GPUUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<GPU>> {
        let response: ServerResponse<GPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editGPU(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete gpu
    @ApiBody({ type: GPUDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deleteGPU(
        @Body() body: GPUDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteGPU(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vraca naslove i ID-jeve
    @Get('all')
    public async getAllCPUs() : Promise<ServerResponse<GPUIDName[]>> {
        let response: ServerResponse<GPUIDName[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getAllGPUs();
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati gpu preko id-a
    @Get(':id')
    public async getCPU(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<ServerResponse<GPU>> {
        let response: ServerResponse<GPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getGPU(id);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }


}