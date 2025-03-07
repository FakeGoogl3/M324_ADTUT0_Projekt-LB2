const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = {
  ignores: ["node_modules/", "build/"], // Ahora solo ignora 'build/' y 'node_modules/'
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};
