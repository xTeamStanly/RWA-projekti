import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CPUUpdateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'CPU Update ID', example: 1 })
    public id!: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true, description: 'New CPU Manufacturer Name', example: 'Intel' })
    public manufacturer?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true, description: 'New CPU Model Name', example: 'Core i9-10900X' })
    public model?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New CPU Price', example: 34000 })
    public price?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New CPU Frequency', example: 3.7 })
    public frequency?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New CPU Core Count', example: 10 })
    public cores?: number;
};