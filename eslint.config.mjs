import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
	globalIgnores(["env.d.ts", ".open-next/**", ".next/**"]),
	...nextCoreWebVitals,
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			"prettier/prettier": "error",
		},
	},
	eslintConfigPrettier,
]);
