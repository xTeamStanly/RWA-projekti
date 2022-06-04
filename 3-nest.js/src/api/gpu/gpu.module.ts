import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GPUController } from "./gpu.controller";
import { GPUService } from "./gpu.service";
import { GPU } from "./model/gpu.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GPU])],
    controllers: [GPUController],
    providers: [GPUService]
}) export class GPUModule {}