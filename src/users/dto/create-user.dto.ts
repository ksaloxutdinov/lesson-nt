import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'], {
        message: 'Valid role required'
    })
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}