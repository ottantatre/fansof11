// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Ignorowane katalogi
  { ignores: ['node_modules/**', 'dist/**'] },

  // Ogólne reguły JS
  js.configs.recommended,

  // ===== App (src) - TypeScript + React + Hooks + typed lint =====
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json'], // <-- ważne: tylko app
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },
    rules: {
      // TS (typed) – bazujemy na recommendedTypeChecked
      ...tseslint.configs.recommendedTypeChecked[0].rules,

      // React + Hooks
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',

      // Prettier jako błędy
      'prettier/prettier': 'error',
    },
    settings: { react: { version: 'detect' } },
  },

  // ===== Pliki Node/konfigi (vite.config.ts, skrypty) - typed lint =====
  {
    files: ['vite.config.ts', 'vitest.config.ts', 'scripts/**/*.ts', '*.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.node.json'], // <-- ważne: tylko node/config
        tsconfigRootDir: import.meta.dirname,
      },
      // Node globals (żeby nie było no-undef na __dirname / process)
      globals: {
        __dirname: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      'prettier/prettier': 'error',
    },
  },

  // ===== Globalne ustawienia Prettiera (styl) =====
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          printWidth: 100,
          tabWidth: 2,
          trailingComma: 'all',
        },
      ],
    },
  },
];
