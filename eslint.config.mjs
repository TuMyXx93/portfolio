import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["coverage/**", "**/coverage/**"],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
