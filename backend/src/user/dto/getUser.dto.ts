import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

/**
 * ユーザー取得[DTO]
 */
@InputType()
export class GetUserInput {

    @Field()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;
}