# PinMate

 ピンアサインを補助するアプリ

## [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

install  eslint
`npm install -g eslint`

initialize eslint
in project root
`eslint --init`

install eslint-plugin-react-hooks
`npm install eslint-plugin-react-hooks`

edit eslintrc.json

```
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {}
}
```
