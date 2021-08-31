module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'prettier', 'node', 'esnext'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'prettier/prettier': 'warn',
        'no-unused-vars': 'warn'
        'no-undef': 'error'
    }
};
