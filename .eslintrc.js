module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  ignorePatterns: ['out/**/*', '.vite/**/*', 'coverage/**/*', 'playwright-report/**/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'promise', 'react'],
  root: true,
  rules: {
    'no-control-regex': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
