module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "next", // Can be set to "next/core-web-vitals" too
        "plugin:react/recommended",
        "airbnb",
        "prettier",
        "plugin:@next/next/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    }
};
