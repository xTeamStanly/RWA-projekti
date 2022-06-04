import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Storage } from "./model/storage.entity";
import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";

@Module({
    imports: [TypeOrmModule.forFeature([Storage])],
    controllers: [StorageController],
    providers: [StorageService]
}) export class StorageModule {}