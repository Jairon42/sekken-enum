import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  pluginReact.configs.flat.recommended,
]);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended", // Establece las reglas recomendadas de ESLint
    "plugin:react/recommended", // Regla recomendada para React
    "plugin:prettier/recommended", // Habilita Prettier como una regla de ESLint
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react", // Plugin de React
    "prettier", // Plugin de Prettier
  ],
  rules: {
    "prettier/prettier": "error", // Marcar como error si no sigue las reglas de Prettier
  },
};
