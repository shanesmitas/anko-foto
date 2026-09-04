import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.astro/**',
      '.verification/**',
      'dist/**',
      'node_modules/**',
      'public/downloads/**',
      'test-results/**',
      'playwright-report/**'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly'
      }
    },
    rules: { 'no-empty': ['error', { allowEmptyCatch: true }] }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
];
