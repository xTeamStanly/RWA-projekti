import { IsOptional, IsString, MaxLength } from "class-validator";

export class UserUpdateDto {
    @IsOptional()
    @IsString()
    @MaxLength(20)
    public name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    public surname?: string;
}