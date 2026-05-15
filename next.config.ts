import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: (process.env.NEXT_OUTPUT_MODE as NextConfig['output']) || undefined,
};

export default nextConfig;
