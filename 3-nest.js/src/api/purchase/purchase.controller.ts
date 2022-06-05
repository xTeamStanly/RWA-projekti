import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { PurchaseIDNamePrice, ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { PurchaseCreateDto } from "./model/purchase.dto.create";
import { PurchaseDeleteDto } from "./model/purchase.dto.remove";
import { Purchase } from "./model/purchase.entity";
import { PurchaseService } from "./purchase.service";

@ApiTags('Purchase')
@Controller({
    path: 'purchase',
    version: '1'
})
export class PurchaseController {
    @Inject(PurchaseService)
    private readonly service: PurchaseService;

    // kreiraj kupovinu
    @ApiBody({ type: PurchaseCreateDto })
    @Post('new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async newPurchase(
        @Body() body: PurchaseCreateDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.createPurchase(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // vrati kupovinu preko id-a
    @Get('id/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getPurchase(
        @Param('id') id: number,
        @Req() req: Request
    ) : Promise<ServerResponse<Purchase>> {
        let response: ServerResponse<Purchase> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getPurchase(id, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // ukloni kupovinu
    @ApiBody({ type: PurchaseDeleteDto })
    @Post('delete')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async deletePurchase(
        @Body() body: PurchaseDeleteDto,
        @Req() req: Request
    ) : Promise<ServerResponse<boolean>> {
        let response: ServerResponse<boolean> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.removePurchase(body, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

    // sve kupovine nekog korisnika
    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getUserPurchases(
        @Param('id') id: number,
        @Req() req: Request
    ) : Promise<ServerResponse<PurchaseIDNamePrice[]>> {
        let response: ServerResponse<PurchaseIDNamePrice[]> = {
            success: false,
            data: null
        };

        try {
            response.data = await this.service.getPurchases(id, req);
            response.success = true;
        } catch(err) {
            response.message = err.message;
        }

        return response;
    }

}