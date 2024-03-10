import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { UserService } from './user.service';
import { User as UserModel } from './models/user.model';
import { CreateUserInput } from './dto/createUser.dto';
import { UpdateUserPasswordInput } from './dto/updateUserPassword.dto';
import { DeleteUserInput } from './dto/deleteUser.dto';

// PubSubインスタンス化
const pubSub = new PubSub();

/**
 * ユーザーリゾルバー
 */
@Resolver(of => UserModel)
export class UserResolver {
    // DI
    constructor(private readonly userService: UserService) {}

    /**
     * ユーザー取得
     * @returns ユーザーデータ[]
     */
    @Query(() => [UserModel], { nullable: true })
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    /**
     * ユーザーの追加
     * @param createUserInput 
     * @returns ユーザーデータ
     */
    @Mutation(() => UserModel)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        const user = await this.userService.createUser(createUserInput);
        pubSub.publish('userCreated', { userCreated: user });
        return user;
    }

    /**
     * パスワードの更新
     * @param updateUserPasswordInput 
     * @returns ユーザーデータ
     */
    @Mutation(() => UserModel)
    async updatePassword(
        @Args('updateUserPasswordInput') updateUserPasswordInput: UpdateUserPasswordInput,
    ): Promise<User> {
        return await this.userService.updatePassword(updateUserPasswordInput);
    }

    /**
     * ユーザーの削除
     * @param deleteUserInput
     * @returns ユーザーデータ
     */
    @Mutation(() => UserModel)
    async deleteUser(
        @Args('deleteUserInput') deleteUserInput: DeleteUserInput,
    ): Promise<User> {
        return await this.userService.deleteUser(deleteUserInput);
    }

    /**
     * サブスクリプション
     * @returns ユーザーデータ
     */
    @Subscription(returns => UserModel)
    userCreated() {
        // userCreated の通知をリアルタイムでクライアントに送信する
        return pubSub.asyncIterator('userCreated');
    }
}
