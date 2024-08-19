/** @type {import("prettier").Options} */
module.exports = {
  printWidth: 100,
  singleAttributePerLine: true,
  singleQuote: true,
  tailwindConfig: './tailwind.config.js',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
};
