import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { RAMIDName, ServerResponse } from "src/interfaces";
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
    public async newRAM(
        @Body() body: RAMCreateDto
    ) : Promise<ServerResponse<RAM>> {
        let response: ServerResponse<RAM> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newRAM(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update ram
    @ApiBody({ type: RAMUpdateDto })
    @Post('edit')
    public async editRAM(
        @Body() body: RAMUpdateDto
    ) : Promise<ServerResponse<RAM>> {
        let response: ServerResponse<RAM> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editRAM(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete ram
    @ApiBody({ type: RamDeleteDto })
    @Post('delete')
    public async deleteRAM(
        @Body() body: RamDeleteDto
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteRAM(body);
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