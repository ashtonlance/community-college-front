import { FaustHooks, FaustPlugin } from "@faustwp/core";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClientOptions, NormalizedCacheObject } from "@apollo/client";

export default class UploadPlugin implements FaustPlugin {
  apply(hooks: FaustHooks) {
    const { addFilter } = hooks;

    // Modify the Apollo Client's options
    addFilter(
      "apolloClientOptions",
      "faust",
      (
        apolloClientOptions: ApolloClientOptions<NormalizedCacheObject>,
        context: Record<string, never>
      ) => {
        // Create an upload link using the 'apollo-upload-client' package
        const uploadLink = createUploadLink({
          uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`,
        });

        // Update the 'link' property of the Apollo Client options
        apolloClientOptions.link = uploadLink;

        // Return the modified Apollo Client options
        return apolloClientOptions;
      }
    );

    // Modify the GraphQL Endpoint
    addFilter(
      "graphqlEndpoint",
      "faust",
      (graphqlEndpoint: string, context: { wpUrl: string }) => {
        // Set the GraphQL endpoint to the value of the environment variable
        return `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`;
      }
    );
  }
}
