import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import nodePlugin from 'eslint-plugin-n'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      n: nodePlugin
    },
    // Add settings here for your main source files
    settings: {
      n: {
        tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx'],
        allowModules: [
          '@actions/core',
          '@actions/cache',
          '@actions/exec',
          '@actions/tool-cache',
          '@actions/http-client'
        ]
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },
  {
    files: ['__tests__/**/*.ts'],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    // Add settings here for your test files
    settings: {
      n: {
        tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx'],
        allowModules: [
          '@jest/globals'
        ]
      }
    },
    rules: {
      ...jest.configs.recommended.rules
    }
  },
  prettier,
  {
    ignores: ['dist/**', 'lib/**', 'node_modules/**']
  }
]
