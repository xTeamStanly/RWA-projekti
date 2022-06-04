import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class RAMUpdateDto {
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'RAM Update ID', example: 1 })
    public id!: number;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    @ApiProperty({ type: String, nullable: true, description: 'New RAM Manufacturer Name', example: 'Patriot' })
    public manufacturer?: string;

    @IsOptional()
    @IsString()
    @MaxLength(25)
    @ApiProperty({ type: String, nullable: true, description: 'New RAM Model Name', example: 'Viper 4' })
    public model?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New RAM Price', example: 21000 })
    public price?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New RAM Frequency', example: 3200 })
    public frequency?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive()
    @ApiProperty({ type: Number, nullable: true, description: 'New RAM Capacity', example: 32 })
    public capacity?: number;
};