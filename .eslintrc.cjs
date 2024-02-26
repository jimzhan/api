module.exports = {
  root: true,
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  //  plugins: ['prettier'],
  ignorePatterns: ['node_modules/*'],
  rules: {
    'space-before-function-paren': 0
  }
}
