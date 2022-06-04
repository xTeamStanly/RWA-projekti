import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class StorageDeleteDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'Storage Delete ID', example: 1 })
    public id!: number;
};