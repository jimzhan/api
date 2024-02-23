module.exports = {
  root: true,
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'prettier',
  ],
  rules: {
    'semi': 0,
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-unresolved': 0
  },
  ignorePatterns: [
    'node_modules/*',
  ]
}
