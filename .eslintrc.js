module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  rules: {
    // indent: [
    //   'error',
    //   2,
    //   {
    //     SwitchCase: 1
    //   }
    // ],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always'],
    // 'vue/jsx-uses-vars': 2,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
