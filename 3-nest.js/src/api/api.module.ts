import { Module } from "@nestjs/common";
import { CPUModule } from "./cpu/cpu.module";
import { GPUModule } from "./gpu/gpu.module";
import { MotherboardModule } from "./motherboard/motherboard.module";

@Module({
    imports: [
        CPUModule,
        GPUModule,
        MotherboardModule
    ]
}) export class ApiModule {}