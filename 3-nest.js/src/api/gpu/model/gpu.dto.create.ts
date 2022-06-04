import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class GPUCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(6)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'GPU Manufacturer Name', example: 'AMD' })
    public manufacturer!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(26)
    @Transform(({value}: TransformFnParams) => String(value).trim())
    @ApiProperty({ type: String, nullable: false, description: 'GPU Model Name', example: 'Radeon RX 5600XT' })
    public model!: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'GPU Price', example: 28000 })
    public price!: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'GPU VRAM', example: 6 })
    public vram?: number;
}