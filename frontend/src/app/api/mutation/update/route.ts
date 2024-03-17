import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Mutation[パスワード更新]
 * @returns ユーザーデータ
 */
export async function PATCH(request: Request) {
    const { 
        email, 
        password, 
        newPassword, 
        confirmPassword 
    } = await request.json();

    // 入力データの検証
    if (!email || !password || !newPassword || newPassword !== confirmPassword) {
        return new NextResponse('バリデーションエラーです。', {
            status: 400,
        });
    }

    const url = process.env.GRAPHQL_NESTJS_URL!;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const variables = {
        "updateUserPasswordInput": {
            "email": email,
            "password": password,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword,
        },
    };
    const data = {
        query: `
        mutation updatePassword($updateUserPasswordInput: UpdateUserPasswordInput!) {
            updatePassword(updateUserPasswordInput: $updateUserPasswordInput) {
              id
              name
              email
              createdAt
              updatedAt
            }
          }`,
        variables: variables,
    };
    
    try {
        const response = await axios.post(url, data, config);
        console.log('Response: ', response.data.data.updatePassword);
        return NextResponse.json(response.data.data.updatePassword);
    } catch (error) {
        console.error('Error: ', error);
        return new NextResponse('サーバー側でエラーが発生しました', {
            status: 500,
        });
    }
}