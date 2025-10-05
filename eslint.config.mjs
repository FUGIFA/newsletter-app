// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import eslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import mantine from "eslint-config-mantine";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

const eslintConfig = [
  // Next + TS presets (via compat)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...mantine,

  // Your project-wide rules (lightweight)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      eqeqeq: ["warn", "smart"],
      curly: ["warn", "multi-line"],
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "dot-notation": "warn",
      "default-case-last": "warn",
      "no-useless-return": "warn",
      "no-duplicate-imports": "warn",

      // double quotes
      quotes: ["warn", "double", { avoidEscape: true }],
      "jsx-quotes": ["warn", "prefer-double"],

      // TS-aware tweaks
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" }
      ],
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-expect-error": "allow-with-description" }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // Ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/generated/**",
      "prisma/**",
    ],
  },
];

export default eslintConfig;
