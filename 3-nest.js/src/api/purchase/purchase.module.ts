import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Configuration } from "../configuration/model/configuration.entity";
import { Purchase } from "./model/purchase.entity";
import { PurchaseController } from "./purchase.controller";
import { PurchaseService } from "./purchase.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        Purchase,
        Configuration
    ])],
    controllers: [PurchaseController],
    providers: [PurchaseService]
}) export class PurchaseModule {}