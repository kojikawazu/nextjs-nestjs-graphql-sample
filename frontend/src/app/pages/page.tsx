import React from 'react';

const page = async () => {
  const data = await fetch(
    process.env.GRAPHQL_NESTJS_URL!, 
    {
      method: "POST",
      body: JSON.stringify({
        query: '\
          query getUsers {\
            getUsers {\
              id\
              name\
              email\
              createdAt\
              updatedAt\
            }\
          }'
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());

  console.log(data.data);

  return (
    <div>query</div>
  );
}

export default page;