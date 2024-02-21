export default {
  verbose: true,
  files: [
    '**/*.spec.js'
  ],
  concurrency: 5,
  failFast: true,
  failWithoutAssertions: false,
  environmentVariables: {
    NODE_ENV: 'test'
  },
  nodeArguments: [
  ]
}
