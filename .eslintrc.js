module.exports = {
    plugins: ['sonarjs'],
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {},
    extends: ['plugin:sonarjs/recommended'],
};
