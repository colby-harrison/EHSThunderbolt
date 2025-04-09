// prettier config | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this file without comments
// you should not be messing with this file
/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: ["*.astro"],
			options: {
				parser: "astro",
				singleQuote: true,
			},
		},
		{
			files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
			options: {
				singleQuote: true,
			},
		},
	],
};
