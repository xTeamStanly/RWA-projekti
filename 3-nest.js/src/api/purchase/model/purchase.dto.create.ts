import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class PurchaseCreateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ type: Number, nullable: false, description: 'Purchase Configration ID', example: 1 })
    public configurationId!: number;
};