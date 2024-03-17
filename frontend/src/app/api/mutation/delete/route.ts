import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Mutation[ユーザー削除]
 * @returns ユーザーデータ
 */
export async function DELETE(request: Request) {
    const { email } = await request.json();

    const url = process.env.GRAPHQL_NESTJS_URL!;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const variables = {
        "deleteUserInput": {
            "email": email,
        },
    };
    const data = {
        query: `
        mutation deleteUser($deleteUserInput: DeleteUserInput!) {
            deleteUser(deleteUserInput: $deleteUserInput) {
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
        console.log('Response: ', response.data.data.deleteUser);
        return NextResponse.json(response.data.data.deleteUser);
    } catch (error) {
        console.error('Error: ', error);
        return new NextResponse('サーバー側でエラーが発生しました', {
            status: 500,
        });
    }
}