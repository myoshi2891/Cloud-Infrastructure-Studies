/**
 * Hands-on guides are available by default for local development and builds.
 * Netlify explicitly sets this variable to "false" in netlify.toml.
 */
export const HANDS_ON_ENABLED = process.env.NEXT_PUBLIC_ENABLE_HANDS_ON !== 'false';
