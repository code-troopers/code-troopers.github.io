import babelParser from "@babel/eslint-parser";
import react from "eslint-plugin-react";
import cypress from "eslint-plugin-cypress";
import globals from "globals";

export default [
  react.configs.flat.recommended,
  {
    languageOptions: {
      parser: babelParser,
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // Decap preview components don't use PropTypes
      "react/prop-types": 0,

      // Possible Errors
      "no-control-regex": 2,
      "no-console": 1,
      "no-debugger": 2,
      "no-dupe-args": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty-character-class": 2,
      "no-ex-assign": 2,
      "no-extra-boolean-cast": 2,
      "no-extra-semi": 2,
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 1,
      "no-proto": 2,
      "no-unexpected-multiline": 2,
      "no-unreachable": 2,
      "valid-typeof": 2,

      // Best Practices
      "no-fallthrough": 2,
      "no-redeclare": 2,

      // Stylistic Issues
      "comma-spacing": 2,
      "eol-last": 2,
      "eqeqeq": ["error", "smart"],
      "indent": [2, 2, {SwitchCase: 1}],
      "keyword-spacing": 2,
      "max-len": [1, 160, 2],
      "new-parens": 2,
      "no-mixed-spaces-and-tabs": 2,
      "no-multiple-empty-lines": [2, {max: 2}],
      "no-trailing-spaces": 2,
      "object-curly-spacing": [2, "never"],
      "quotes": [2, "double", "avoid-escape"],
      "semi": 2,
      "space-before-blocks": [2, "always"]
    }
  },
  {
    files: ["cypress/**/*.js"],
    ...cypress.configs.recommended
  }
];
