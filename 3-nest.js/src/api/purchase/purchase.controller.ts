import { Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ServerResponse } from "src/interfaces";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { PurchaseCreateDto } from "./model/purchase.dto.create";
import { PurchaseService } from "./purchase.service";

@ApiTags('Purchase')
@Controller({
    path: 'purchase',
    version: '1'
})
export class PurchaseController {
    @Inject(PurchaseService)
    private readonly service: PurchaseService;

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


    // todo get single purchase

    // todo remove purchase

    // todo get all user purchases

}