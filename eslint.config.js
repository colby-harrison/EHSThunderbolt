import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,astro,tsx,jsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: [
      '.astro/',
      'node_modules/',
      'dist/',
      '.wrangler/',
      '.github/',
      '.vscode/',
      'tailwind.config.mjs',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      'astro/no-set-html-directive': 'error',
    },
  },
];
