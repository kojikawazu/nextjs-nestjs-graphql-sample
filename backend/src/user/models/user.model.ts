import { Field, Int, ObjectType } from "@nestjs/graphql";

/**
 * ユーザーモデル
 */
@ObjectType()
export class User {

    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}