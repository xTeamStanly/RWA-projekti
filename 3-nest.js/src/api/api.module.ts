import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { CPUModule } from "./cpu/cpu.module";
import { GPUModule } from "./gpu/gpu.module";
import { MotherboardModule } from "./motherboard/motherboard.module";
import { RAMModule } from "./ram/ram.module";
import { StorageModule } from "./storage/storage.module";

@Module({
    imports: [
        CPUModule,
        GPUModule,
        MotherboardModule,
        StorageModule,
        RAMModule,
        ConfigurationModule
    ]
}) export class ApiModule {}