module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    plugins: ["@typescript-eslint", "react", "prettier", "tailwindcss", "import"],
    settings: {
        react: {
            version: "18.3"
        }
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "prettier/prettier": [
            "error",
            {
                arrowParens: "always",
                semi: true,
                trailingComma: "none",
                tabWidth: 4,
                endOfLine: "auto",
                useTabs: false,
                singleQuote: false,
                printWidth: 120,
                jsxSingleQuote: false
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "tailwindcss/classnames-order": "warn",
        "tailwindcss/no-custom-classname": "warn",
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                pathGroups: [
                    {
                        pattern: "next/**",
                        group: "external",
                        position: "before"
                    },
                    {
                        pattern: "~/components/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "~/lib/**",
                        group: "internal",
                        position: "after"
                    }
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                "newlines-between": "always",
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true
                }
            }
        ]
    },
    overrides: [
        {
            files: ["src/components/ui/*.tsx"],
            rules: {
                "tailwindcss/no-custom-classname": "off"
            }
        }
    ]
};
