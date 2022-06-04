import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class ConfigurationUpdateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'Configuration Update ID', example: 1 })
    public id!: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    @ApiProperty({ type: String, nullable: true, description: 'New Configuration Name', example: 'Ealdrelm' })
    public name?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Configuration CPU ID', example: 1 })
    public cpuID?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Configuration GPU ID', example: 1 })
    public gpuID?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Configuration RAM ID', example: 1 })
    public ramID?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Configuration Storage ID', example: 1 })
    public storageID?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New Configuration Motherboard ID', example: 1 })
    public motherboardID?: number;
}