import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class StorageUpdateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'Storage Update ID', example: 1 })
    public id!: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true, description: 'New Storage Manufacturer Name', example: 'Samsung' })
    public manufacturer?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true, description: 'New Storage Model Name', example: '970 EVO PLUS' })
    public model?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Storage Price', example: 46000 })
    public price?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Storage Capacity', example: 2048 })
    public capacity?: number;
};