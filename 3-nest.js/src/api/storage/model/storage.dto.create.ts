import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class StorageCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'Storage Manufacturer Name', example: 'Western Digital' })
    public manufacturer!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'Storage Model Name', example: 'Gold' })
    public model!: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'Storage Price', example: 24000 })
    public price!: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'Storage Capacity', example: 4096 })
    public capacity?: number;
};