import React from 'react';

/**
 * Mutation(ユーザー削除)ページ
 * @returns JSX
 */
const MutationDeletePage = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mutation/delete`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            body: JSON.stringify({
                email: "tester@example.com",
            }),
        },
    );
    const responseData = await response.json();
    console.log(responseData);

    return (
        <div>update</div>
    );
}

export default MutationDeletePage;