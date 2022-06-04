import { Module } from "@nestjs/common";
import { CPUModule } from "./cpu/cpu.module";
import { GPUModule } from "./gpu/gpu.module";
import { MotherboardModule } from "./motherboard/motherboard.module";
import { StorageModule } from "./storage/storage.module";

@Module({
    imports: [
        CPUModule,
        GPUModule,
        MotherboardModule,
        StorageModule
    ]
}) export class ApiModule {}