import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RAM } from "./model/ram.entity";
import { RAMController } from "./ram.controller";
import { RAMService } from "./ram.service";

@Module({
    imports: [TypeOrmModule.forFeature([RAM])],
    controllers: [RAMController],
    providers: [RAMService]
}) export class RAMModule {}