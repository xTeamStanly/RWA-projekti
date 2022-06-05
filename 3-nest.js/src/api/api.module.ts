import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { CPUModule } from "./cpu/cpu.module";
import { GPUModule } from "./gpu/gpu.module";
import { MotherboardModule } from "./motherboard/motherboard.module";
import { PurchaseModule } from "./purchase/purchase.module";
import { RAMModule } from "./ram/ram.module";
import { StorageModule } from "./storage/storage.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        CPUModule,
        GPUModule,
        MotherboardModule,
        StorageModule,
        RAMModule,
        ConfigurationModule,
        UserModule,
        PurchaseModule
    ]
}) export class ApiModule {}