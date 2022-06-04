import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class MotherboardCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'Motherboard Manufacturer Name', example: 'MSI' })
    public manufacturer!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'Motherboard Model Name', example: 'B450 TOMAHAWK MAX' })
    public model!: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'Motherboard Price', example: 15000 })
    public price!: number;
};