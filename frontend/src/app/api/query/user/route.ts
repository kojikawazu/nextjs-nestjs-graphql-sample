import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Query取得
 * @returns ユーザーデータ
 */
export async function GET() {
    const url = process.env.GRAPHQL_NESTJS_URL!;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const data = {
        query: `
        query getUsers {
            getUsers {
              id
              name
              email
              createdAt
              updatedAt
            }
        }`
    };

    try {
        const response = await axios.post(url, data, config);
        console.log('Response: ', response.data.data.getUsers);
        return NextResponse.json(response.data.data.getUsers);
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ message: 'データの取得に失敗しました。' }, {
            status: 500,
        });
    }
}