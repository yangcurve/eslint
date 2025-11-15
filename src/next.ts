import next from '@next/eslint-plugin-next'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

export const nextConfig = defineConfig(
  next.configs['core-web-vitals'],

  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  reactHooks.configs.flat.recommended,

  globalIgnores(['.next']),

  {
    files: ['**/*.tsx', '**/*.jsx'],
    settings: { react: { version: 'detect' } },
    rules: {
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
)
