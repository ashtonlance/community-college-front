import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://ncccs-api.ddev.site/graphql`,
  generates: {
    './generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
