import React from 'react';

/**
 * Mutation(パスワード更新)ページ
 * @returns JSX
 */
const MutationUpdatePage = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mutation/update`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            body: JSON.stringify({
                email: "tester@example.com",
                password: "testertester",
                newPassword: "testertestertester",
                confirmPassword: "testertestertester",
            }),
        },
    );
    const responseData = await response.json();
    console.log(responseData);

    return (
        <div>page</div>
    );
}

export default MutationUpdatePage;