import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Mutation[ユーザー追加]
 * @param request 
 * @returns ユーザーデータ
 */
export async function POST(request: Request) {
    const { name, email, password, confirmPassword } = await request.json();

    // 入力データの検証
    if (!name || !email || !password || password !== confirmPassword) {
        return new NextResponse('バリデーションエラーです。', {
            status: 500,
        });
    }

    const url = process.env.GRAPHQL_NESTJS_URL!;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const variables = {
        "createUserInput": {
            "name": name,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
        },
    };
    const data = {
        query: `
        mutation createUser($createUserInput: CreateUserInput!) {
            createUser(createUserInput: $createUserInput) {
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
        console.log('Response: ', response.data.data.createUser);
        return NextResponse.json(response.data.data.createUser);
    } catch (error) {
        console.error('Error: ', error);
        return new NextResponse('サーバー側でエラーが発生しました', {
            status: 500,
        });
    }
}