const offInDev = process.env.NODE_ENV === 'production' ? 'warn' : 'off'

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    // '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': offInDev,
    'no-debugger': offInDev,
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'prefer-promise-reject-errors': offInDev,
    'comma-dangle': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
