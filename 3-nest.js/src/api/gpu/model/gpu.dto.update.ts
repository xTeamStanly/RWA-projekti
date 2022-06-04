import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class GPUUpdateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'GPU Update ID', example: 1 })
    public id!: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true, description: 'New GPU Manufacturer Name', example: 'Nvidia' })
    public manufacturer?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true, description: 'New GPU Model Name', example: 'GeForce RTX 2060' })
    public model?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New GPU Price', example: 35000 })
    public price?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New GPU Vram', example: 6 })
    public vram?: number;
};