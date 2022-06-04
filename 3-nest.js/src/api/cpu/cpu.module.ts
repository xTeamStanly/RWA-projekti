import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CPUController } from "./cpu.controller";
import { CPUService } from "./cpu.service";
import { CPU } from "./model/cpu.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CPU])],
    controllers: [CPUController],
    providers: [CPUService]
}) export class CPUModule {}