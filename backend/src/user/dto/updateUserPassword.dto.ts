import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";
import { IsMatch } from "../decorator/customDecorator";

/**
 * ユーザー更新[DTO]
 */
@InputType()
export class UpdateUserPasswordInput {

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsOptional()
    password?: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsOptional()
    newPassword?: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsOptional()
    @IsMatch('newPassword', { message: 'NewPassword and confirm newPassword do not match' })
    confirmPassword?: string;
}