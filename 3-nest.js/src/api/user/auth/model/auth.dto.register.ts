import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AuthRegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(256)
    @Transform(({value}: TransformFnParams) => String(value).trim().toLowerCase())
    @ApiProperty({ type: String, nullable: false, description: 'User E-mail Address', example: 'user@user.net' })
    public email!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    @ApiProperty({ type: String, nullable: false, description: 'User Password', example: 'password123' })
    public password!: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @ApiProperty({ type: String, nullable: true, description: 'User Name', example: 'Boban' })
    public name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @ApiProperty({ type: String, nullable: true, description: 'User Surname', example: 'Bobanović' })
    public surname?: string;
}