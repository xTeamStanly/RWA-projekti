import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class CPUCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'CPU Manufacturer Name', example: 'AMD' })
    public manufacturer!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'CPU Model Name', example: 'Ryzen 7 3700X' })
    public model!: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'CPU Price', example: 34000 })
    public price!: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'CPU Frequency', example: 3.6 })
    public frequency?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'CPU Core Count', example: 8 })
    public cores?: number;
};