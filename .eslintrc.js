module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', 'plugin:mocha/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['mocha'],
  rules: {
    'linebreak-style': 0,
    'mocha/no-mocha-arrows': 0,
    'import/prefer-default-export': 0,
  },
};
