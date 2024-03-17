'use client';
import React, { useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';

const USER_CREATED_SUBSCRIPTION = gql`
  subscription userCreated {
    userCreated {
      id
      name
      email
    }
  }
`;

const SubScriptionPage = () => {
    const { data, loading, error } = useSubscription(USER_CREATED_SUBSCRIPTION);

    useEffect(() => {
        if (!loading && data) {
            console.log('Subscription data:', data);
          }
          if (error) {
            console.error('Subscription error:', error);
          }
    }, [data, loading, error]);


    return (
        <div>subscription</div>
    );
}

export default SubScriptionPage;