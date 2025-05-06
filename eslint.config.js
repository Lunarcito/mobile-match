import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist"]
  },
  {
    files: ["**/*.{js,jsx}", "vite.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module"
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      prettier: prettierPlugin
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "prettier" // Extiende las configuraciones de Prettier para evitar conflictos con otras reglas
    ],
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^React$|^[A-Z]" // Ignora las importaciones de React y los componentes de clase
        }
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prettier/prettier": "error", // Asegúrate de que Prettier sea ejecutado como error
      "comma-dangle": "off" // Esto puede ser ajustado según tus preferencias
    }
  }
];
