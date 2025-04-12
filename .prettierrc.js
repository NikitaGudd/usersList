import prettierPluginSortImports from "@trivago/prettier-plugin-sort-imports";

/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "auto",
  plugins: [prettierPluginSortImports],
  importOrder: [
    "^react",
    "^@?\\w",
    "^(@/pages)(/.*|$)",
    "^(@/components)(/.*|$)",
    "^(@/modules)(/.*|$)",
    "^(@/lib)(/.*|$)",
    "^(@/styles)(/.*|$)",
    "^(@/types)(/.*|$)",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
