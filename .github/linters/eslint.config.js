import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import nodePlugin from 'eslint-plugin-n'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  // 1. GLOBAL SETTINGS OVERRIDE (Applies to all files)
  {
    settings: {
      // Both namespaces ensure eslint-plugin-n captures the configuration
      n: {
        tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx'],
        allowModules: [
          '@actions/core',
          '@actions/cache',
          '@actions/exec',
          '@actions/tool-cache',
          '@actions/http-client',
          '@jest/globals'
        ]
      },
      node: {
        tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx'],
        allowModules: [
          '@actions/core',
          '@actions/cache',
          '@actions/exec',
          '@actions/tool-cache',
          '@actions/http-client',
          '@jest/globals'
        ]
      }
    }
  },

  // 2. RECOMMENDED BASE RULES
  js.configs.recommended,

  // 3. TYPESCRIPT SOURCE FILES
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
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },

  // 4. JEST TEST FILES
  {
    files: ['__tests__/**/*.ts'],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      ...jest.configs.recommended.rules
    }
  },

  // 5. FORMATTING CODE SYNC
  prettier,
  {
    ignores: ['dist/**', 'lib/**', 'node_modules/**']
  }
]