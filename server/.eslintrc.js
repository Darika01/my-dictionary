module.exports = {
    env: {
        // browser: true,
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'prettier', 'node'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        // 'prettier/prettier': 'warn',
        'no-unused-vars': 'warn',
        'import/no-commonjs': 'off'
    }
};
