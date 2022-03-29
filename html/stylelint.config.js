module.exports = {
  plugins: ["stylelint-prettier"],
  extends: [
    "stylelint-prettier/recommended",
    "stylelint-config-prettier",
    "stylelint-config-recess-order",
  ],
  ignoreFiles: ["**/node_modules/**"],
  rules: {
    "prettier/prettier": true,
  },
};
