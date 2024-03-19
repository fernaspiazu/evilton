module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './src'],
  },
}