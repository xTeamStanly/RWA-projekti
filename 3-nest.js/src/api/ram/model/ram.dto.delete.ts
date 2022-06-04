import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class RamDeleteDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ type: Number, nullable: false, description: 'RAM Delete ID', example: 1 })
    public id!: number;
};