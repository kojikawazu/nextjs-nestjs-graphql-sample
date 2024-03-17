import React from 'react';

/**
 * Queryページ
 * @returns JSX
 */
const QueryPage = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/query/user`,
        { cache: "no-store" },
    );
    const responseData = await response.json();
    console.log(responseData);

    return (
        <div>query</div>
    );
}

export default QueryPage;