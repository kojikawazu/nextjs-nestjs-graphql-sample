import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

/**
 * ユーザー削除[DTO]
 */
@InputType()
export class DeleteUserInput {

    @Field()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;
}