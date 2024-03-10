import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.dto';
import { UpdateUserPasswordInput } from './dto/updateUserPassword.dto';
import { DeleteUserInput } from './dto/deleteUser.dto';

/**
 * ユーザーサービス
 */
@Injectable()
export class UserService {
    // コンストラクタにDI
    constructor(private readonly prismaService: PrismaService) {}

    /**
     * ユーザー全取得
     * @returns ユーザーデータ配列
     */
    async getUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }

    /**
     * ユーザー取得
     * @param email
     * @returns ユーザーデータ
     */
    async getUser(
        email: string,
    ): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: { email },
        });
    }

    /**
     * ユーザー追加
     * @param createUserInput 
     * @returns ユーザーデータ
     */
    async createUser(
        createUserInput: CreateUserInput,
    ): Promise<User> {
        const {name, email, password} = createUserInput;
        
        return await this.prismaService.user.create({
            data: {
                name,
                email,
                password,
            }
        });
    }

    /**
     * パスワードの更新
     * @param updateUserPasswordInput 
     * @returns ユーザーデータ
     */
    async updatePassword(
        updateUserPasswordInput: UpdateUserPasswordInput,
    ): Promise<User> {
        const {email, password, newPassword} = updateUserPasswordInput;
        
        // ユーザー存在有無確認
        const user = await this.getUser(email);
        // パスワード確認
        if (user.password !== password) {
            throw new NotFoundException('パスワードが一致しませんでした');
        }
        
        // パスワード更新
        return await this.prismaService.user.update({
            data: {
                password: newPassword
            },
            where: { email },
        });
    }

    /**
     * ユーザー削除
     * @param deleteUserInput
     * @returns ユーザーデータ
     */
    async deleteUser(
        deleteUserInput: DeleteUserInput,
    ): Promise<User> {
        const {email} = deleteUserInput;
        
        return await this.prismaService.user.delete({
            where: {email},
        });
    }
}
