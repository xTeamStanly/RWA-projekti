import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CPUIDName, ServerResponse } from "src/interfaces";
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
    public async newCPU(
        @Body() body: CPUCreateDto
    ) : Promise<ServerResponse<CPU>> {
        let response: ServerResponse<CPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newCPU(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update cpu
    @ApiBody({ type: CPUUpdateDto })
    @Post('edit')
    public async editCPU(
        @Body() body: CPUUpdateDto
    ) : Promise<ServerResponse<CPU>> {
        let response: ServerResponse<CPU> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editCPU(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete cpu
    @ApiBody({ type: CPUDeleteDto })
    @Post('delete')
    public async deleteCPU(
        @Body() body: CPUDeleteDto
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteCPU(body);
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