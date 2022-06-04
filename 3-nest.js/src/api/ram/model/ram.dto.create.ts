import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class RAMCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'RAM Manufacturer Name', example: 'Kingston' })
    public manufacturer!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'RAM Model Name', example: 'HyperX Fury XMP' })
    public model!: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'RAM Price', example: 15000 })
    public price!: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'RAM Frequency', example: 3200 })
    public frequency?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'RAM Capacity', example: 16 })
    public capacity?: number;
};