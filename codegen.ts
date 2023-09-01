import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://nextword.wpengine.com/graphql`,
  generates: {
    "./generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
