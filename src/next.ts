import next_ from '@next/eslint-plugin-next'
import react_ from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import { base } from './base'

export const next = defineConfig(
  base,
  react_.configs.flat.recommended,
  react_.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  next_.configs['core-web-vitals'],
  globalIgnores(['.next']),
  {
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
)
