import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Motherboard } from "./model/motherboard.entity";
import { MotherboardController } from "./motherboard.controller";
import { MotherboardService } from "./motherboard.service";

@Module({
    imports: [TypeOrmModule.forFeature([Motherboard])],
    controllers: [MotherboardController],
    providers: [MotherboardService]
}) export class MotherboardModule {}