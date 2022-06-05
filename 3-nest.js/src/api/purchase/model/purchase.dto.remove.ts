import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class PurchaseDeleteDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ type: Number, nullable: false, description: 'Delete Purchase ID', example: 1 })
    public id!: number;
};