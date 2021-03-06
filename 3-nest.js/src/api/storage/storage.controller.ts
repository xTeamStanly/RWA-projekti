import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ServerResponse, StorageIDName } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { StorageCreateDto } from "./model/storage.dto.create";
import { StorageDeleteDto } from "./model/storage.dto.delete";
import { StorageUpdateDto } from "./model/storage.dto.update";
import { Storage } from "./model/storage.entity";
import { StorageService } from "./storage.service";


@ApiTags('Storage')
@Controller({
    path: 'storage',
    version: '1'
})
export class StorageController {
    @Inject(StorageService)
    private readonly service: StorageService;

    // kreiraj skladiste
    @ApiBody({ type: StorageCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newStorage(
        @Body() body: StorageCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<Storage>> {
        let response: ServerResponse<Storage> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newStorage(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update storage
    @ApiBody({ type: StorageUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async editStorage(
        @Body() body: StorageUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<Storage>> {
        let response: ServerResponse<Storage> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editStorage(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete storage
    @ApiBody({ type: StorageDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deleteStorage(
        @Body() body: StorageDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteStorage(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vraca naslove i ID-jeve
    @Get('all')
    public async getAllStorages() : Promise<ServerResponse<StorageIDName[]>> {
        let response: ServerResponse<StorageIDName[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getAllStorages();
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati skladiste preko id-a
    @Get(':id')
    public async getStorage(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<ServerResponse<Storage>> {
        let response: ServerResponse<Storage> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getStorage(id);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }
}