import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // 0) Globalne ignorowanie (DZIAŁA w flat config)
  {
    ignores: [
      '**/node_modules/**',
      '**/.git/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/coverage/**',
      '**/drizzle/**', // wygenerowane migracje
      '**/*.d.ts', // opcjonalnie, jeśli zaśmieca
    ],
  },

  // 1) Presety bazowe
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 2) Nasze reguły + zawężone globy plików
  {
    files: [
      'apps/**/src/**/*.{ts,tsx,js,jsx}',
      'packages/**/src/**/*.{ts,tsx,js,jsx}',
      'services/**/src/**/*.{ts,tsx,js,jsx}',
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },

  // 3) Konfiguracje narzędzi (CJS/Node) — postcss.config.js, tailwind.config.js itp.
  {
    files: ['**/*config.{js,cjs,mjs}', 'apps/**/postcss.config.js'],
    languageOptions: {
      sourceType: 'script', // pozwala na CJS
      globals: {
        module: 'readonly', // dla module.exports
        require: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off', // nie krzycz na globalne CJS
      'no-console': 'off', // konfiguracje często logują — pozwólmy
    },
  },

  // (opcjonalnie) później możemy dodać type-aware lint z project: tsconfig.json
  // dla apps/web i apps/api w osobnych blokach.
]);
