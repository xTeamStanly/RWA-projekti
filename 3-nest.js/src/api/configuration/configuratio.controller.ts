import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ConfigurationIDNamePrice, ServerResponse } from "src/interfaces";
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
    public async newConfiguration(
        @Body() body: ConfigurationCreateDto
    ) : Promise<ServerResponse<Configuration>> {
        let response: ServerResponse<Configuration> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.newConfiguration(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // update configuration
    @ApiBody({ type: ConfigurationUpdateDto })
    @Post('edit')
    public async editConfiguration(
        @Body() body: ConfigurationUpdateDto
    ) : Promise<ServerResponse<Configuration>> {
        let response: ServerResponse<Configuration> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.editConfiguration(body);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // delete configuration
    @ApiBody({ type: ConfigurationDeleteDto })
    @Post('delete')
    public async deleteConfiguration(
        @Body() body: ConfigurationDeleteDto
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.deleteConfiguration(body);
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