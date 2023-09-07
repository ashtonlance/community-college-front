module.exports = {
  ...require('@simplefocus/prettier-config'),
  tabWidth: 2,
  plugins: [
    'prettier-plugin-tailwindcss', // ⚠️ Order is very important place Tailwind prettier plugin at the end
  ],
}
