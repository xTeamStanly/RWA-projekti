import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CPUIDName, ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { CPUService } from "./cpu.service";
import { CPUCreateDto } from "./model/cpu.dto.create";
import { CPUDeleteDto } from "./model/cpu.dto.delete";
import { CPUUpdateDto } from "./model/cpu.dto.update";
import { CPU } from "./model/cpu.entity";

@ApiTags('CPU')
@Controller({
    path: 'cpu',
    version: '1'
})
export class CPUController {
    @Inject(CPUService)
    private readonly service: CPUService;

    // kreiraj cpu
    @ApiBody({ type: CPUCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newCPU(
        @Body() body: CPUCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<CPU>> {
        let response: ServerResponse<CPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newCPU(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update cpu
    @ApiBody({ type: CPUUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async editCPU(
        @Body() body: CPUUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<CPU>> {
        let response: ServerResponse<CPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editCPU(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete cpu
    @ApiBody({ type: CPUDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deleteCPU(
        @Body() body: CPUDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteCPU(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vraca naslove i ID-jeve
    @Get('all')
    public async getAllCPUs() : Promise<ServerResponse<CPUIDName[]>> {
        let response: ServerResponse<CPUIDName[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getAllCPUs();
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati cpu preko id-a
    @Get(':id')
    public async getCPU(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<ServerResponse<CPU>> {
        let response: ServerResponse<CPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getCPU(id);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

}