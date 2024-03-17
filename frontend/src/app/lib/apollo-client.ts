"use client";
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { NextSSRApolloClient, NextSSRInMemoryCache } from '@apollo/experimental-nextjs-app-support/ssr';

const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_NESTJS_URL, // GraphQLサーバーのHTTPエンドポイント
});

const wsLink = new WebSocketLink({
    uri: 'ws://nestjs:8000/graphql', // GraphQLサーバーのWebSocketエンドポイント
    options: {
      reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

export function makeClient() {
    return new NextSSRApolloClient({
        link: splitLink,
        cache: new NextSSRInMemoryCache(),
    });
} 
  
