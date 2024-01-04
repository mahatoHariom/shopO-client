import { ApolloClient, HttpLink } from "@apollo/client";
import { registerApolloClient} from "@apollo/experimental-nextjs-app-support/rsc";
import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:8000/graphql",
    }),
  });
});