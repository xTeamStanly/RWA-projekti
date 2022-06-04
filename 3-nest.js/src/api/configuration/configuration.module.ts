import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CPU } from "../cpu/model/cpu.entity";
import { GPU } from "../gpu/model/gpu.entity";
import { Motherboard } from "../motherboard/model/motherboard.entity";
import { RAM } from "../ram/model/ram.entity";
import { Storage } from "../storage/model/storage.entity";
import { ConfigurationController } from "./configuratio.controller";
import { ConfigurationService } from "./configuration.service";
import { Configuration } from "./model/configuration.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
        Configuration,
        CPU,
        GPU,
        RAM,
        Motherboard,
        Storage
    ])],
    controllers: [ConfigurationController],
    providers: [ConfigurationService]
}) export class ConfigurationModule {}