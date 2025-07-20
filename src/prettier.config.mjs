/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    semi: true,
    trailingComma: "all",
    singleQuote: false,
    printWidth: 100,
    tabWidth: 4,
    bracketSameLine: false,
    plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
