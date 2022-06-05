import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ConfigurationIDNamePrice, ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { ConfigurationService } from "./configuration.service";
import { ConfigurationCreateDto } from "./model/configuration.dto.create";
import { ConfigurationDeleteDto } from "./model/configuration.dto.delete";
import { ConfigurationUpdateDto } from "./model/configuration.dto.update";
import { Configuration } from "./model/configuration.entity";

@ApiTags('Configuration')
@Controller({
    path: 'configuration',
    version: '1'
})
export class ConfigurationController {
    @Inject(ConfigurationService)
    private readonly service: ConfigurationService;

    // kreiraj konfiguraciju
    @ApiBody({ type: ConfigurationCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newConfiguration(
        @Body() body: ConfigurationCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<Configuration>> {
        let response: ServerResponse<Configuration> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newConfiguration(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update configuration
    @ApiBody({ type: ConfigurationUpdateDto })
    @Post('edit')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async editConfiguration(
        @Body() body: ConfigurationUpdateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<Configuration>> {
        let response: ServerResponse<Configuration> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editConfiguration(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete configuration
    @ApiBody({ type: ConfigurationDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deleteConfiguration(
        @Body() body: ConfigurationDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteConfiguration(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vraca naslove, ID-jeve i cenu
    @Get('all')
    public async getAllConfigurations() : Promise<ServerResponse<ConfigurationIDNamePrice[]>> {
        let response: ServerResponse<ConfigurationIDNamePrice[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getAllConfigurations();
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati konfiguraciju preko naziva
    @Get('name/:name')
    public async getConfigurationByName(
        @Param('name') name: string
    ) : Promise<ServerResponse<Configuration>> {
        let response: ServerResponse<Configuration> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getConfigurationByName(name);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati konfiguraciju preko id-a
    @Get('id/:id')
    public async getConfiguration(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<ServerResponse<Configuration>> {
        let response: ServerResponse<Configuration> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getConfiguration(id);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

}