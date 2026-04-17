import { fixupConfigRules } from "@eslint/compat";
import nextConfig from "eslint-config-next/core-web-vitals";

export default fixupConfigRules([
    ...nextConfig,
]);