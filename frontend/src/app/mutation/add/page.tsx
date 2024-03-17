import React from 'react';

/**
 * Mutation(ユーザー追加)ページ
 * @returns JSX
 */
const MutationAddPage = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mutation/add`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            body: JSON.stringify({
                name: "tester",
                email: "tester@example.com",
                password: "testertester",
                confirmPassword: "testertester",
            }),
        },
    );
    const responseData = await response.json();
    console.log(responseData);

    return (
        <div>add</div>
    );
}

export default MutationAddPage;