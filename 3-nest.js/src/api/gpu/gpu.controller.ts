import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { GPUIDName, ServerResponse } from "src/interfaces";
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
    public async newCPU(
        @Body() body: GPUCreateDto
    ) : Promise<ServerResponse<GPU>> {
        let response: ServerResponse<GPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newGPU(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update gpu
    @ApiBody({ type: GPUUpdateDto })
    @Post('edit')
    public async editCPU(
        @Body() body: GPUUpdateDto
    ) : Promise<ServerResponse<GPU>> {
        let response: ServerResponse<GPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editGPU(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete gpu
    @ApiBody({ type: GPUDeleteDto })
    @Post('delete')
    public async deleteGPU(
        @Body() body: GPUDeleteDto
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteGPU(body);
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