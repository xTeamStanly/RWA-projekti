import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthLoginDto {
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
}