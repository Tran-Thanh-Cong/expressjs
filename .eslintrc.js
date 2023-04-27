module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "perttier/@typescript-eslint",
    "plugin:perttier/recommended"
  ],
  parseOptions: {
    esmaVersion: 2018,
    sourceType: "module",
  },
  rules: {},
}