import eslint from '@eslint/js'
import next from '@next/eslint-plugin-next'
import import_ from 'eslint-plugin-import'
import n from 'eslint-plugin-n'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import perfectionist from 'eslint-plugin-perfectionist'
// @ts-expect-error ...
import preferArrow from 'eslint-plugin-prefer-arrow'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import { type Config as PrettierConfig } from 'prettier'
import tseslint from 'typescript-eslint'

const nextConfig = defineConfig(
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

export const createConfig = ({
  tsconfigRootDir,
  isNext = false,
  prettierConfig = {},
}: {
  tsconfigRootDir: string
  isNext?: boolean
  prettierConfig?: PrettierConfig
}) =>
  defineConfig(
    isNext ? nextConfig : [],

    eslint.configs.recommended,
    tseslint.configs.recommended,

    import_.flatConfigs.recommended,
    import_.flatConfigs.typescript,
    import_.flatConfigs.errors,

    globalIgnores(['node_modules']),

    {
      files: ['**/*.ts', '**/*.js'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      plugins: {
        prettier,
        perfectionist,
        n,
        'prefer-arrow': preferArrow,
        'no-relative-import-paths': noRelativeImportPaths,
        'unused-imports': unusedImports,
      },
      settings: {
        'import/resolver': {
          typescript: {
            bun: true,
          },
        },
      },
      rules: {
        '@typescript-eslint/array-type': 'warn',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
          },
        ],

        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: 'directive', next: '*' },
        ],

        'prettier/prettier': [
          'error',
          {
            semi: false,
            // printWidth: 100,
            singleQuote: true,
            experimentalTernaries: true,
            plugins: ['prettier-plugin-tailwindcss'],
            ...prettierConfig,
          } satisfies PrettierConfig,
        ],

        'prefer-arrow/prefer-arrow-functions': 'error',

        'unused-imports/no-unused-imports': 'error',

        'no-relative-import-paths/no-relative-import-paths': [
          'error',
          {
            allowSameFolder: true,
            rootDir: 'src',
            prefix: '@',
          },
        ],

        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
        'import/namespace': 'off',
        'import/newline-after-import': 'error',

        'n/prefer-node-protocol': 'error',

        'perfectionist/sort-named-imports': [
          'error',
          {
            ignoreCase: false,
            groupKind: 'types-first',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            tsconfigRootDir,
            newlinesBetween: 'never',
            ignoreCase: false,
            groups: [
              'type',
              'builtin',
              'external',
              'unknown',
              'internal',
              'index',
              'sibling',
              'parent',
              'side-effect',
            ],
          },
        ],
      },
    },
  )
