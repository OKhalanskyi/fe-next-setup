import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: tseslint.configs.recommended,
});

const disabledRules = {
  "@typescript-eslint/lines-between-class-members": "off",
  "lines-between-class-members": "off",
  "@typescript-eslint/no-throw-literal": "off",
  "no-throw-literal": "off"
};

const tsParserOptions = {
  project: "./tsconfig.json",
  tsconfigRootDir: __dirname,
  ecmaVersion: "latest",
  sourceType: "module"
};

const eslintConfig = [
  {
    ignores: ["eslint.config.mjs"]
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: tsParserOptions
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tseslint
    },
  },
  ...compat.config({
    extends: [
      "airbnb",
      "airbnb-typescript",
      "next/core-web-vitals",
      "next/typescript",
      "prettier"
    ],
    rules: disabledRules
  }),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/dot-notation": "warn",
      ...disabledRules
    },
  },
];

export default eslintConfig;
