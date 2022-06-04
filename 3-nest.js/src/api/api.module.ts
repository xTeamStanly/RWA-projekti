import { Module } from "@nestjs/common";
import { CPUModule } from "./cpu/cpu.module";
import { GPUModule } from "./gpu/gpu.module";

@Module({
    imports: [
        CPUModule,
        GPUModule
    ]
}) export class ApiModule {}