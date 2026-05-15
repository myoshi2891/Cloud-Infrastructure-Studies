import type { NextConfig } from 'next';

const output: NextConfig['output'] =
  process.env.NEXT_OUTPUT_MODE === 'standalone' ? 'standalone' : undefined;

const nextConfig: NextConfig = {
  output,
};

export default nextConfig;
