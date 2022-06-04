import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class MotherboardUpdateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'Motherboard Update ID', example: 1 })
    public id!: number;

    @IsOptional()
    @IsString()
    @MaxLength(15)
    @ApiProperty({ type: String, nullable: true, description: 'New Motherboard Manufacturer Name', example: 'Gigabyte' })
    public manufacturer?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @ApiProperty({ type: String, nullable: true, description: 'New Motherboard Model Name', example: 'Z590 VISION G' })
    public model?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Motherboard Price', example: 36000 })
    public price?: number;
};