module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    semi: 0,
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-unresolved': 0,
  },
  ignorePatterns: ['node_modules/*'],
}
