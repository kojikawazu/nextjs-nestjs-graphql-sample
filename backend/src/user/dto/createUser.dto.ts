import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsMatch } from "../decorator/customDecorator";

/**
 * ユーザー作成[DTO]
 */
@InputType()
export class CreateUserInput {

    @Field()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @Field()
    @MinLength(8)
    @MaxLength(20)
    @IsMatch('password', { message: 'Password and confirm password do not match' })
    confirmPassword: string;
}