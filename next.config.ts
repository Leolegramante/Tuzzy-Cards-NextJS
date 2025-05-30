'use server'

import type {NextConfig} from "next";
import path from 'path';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://api.sideboard.com.br/image/**'), new URL('http://localhost:3333/image/**')],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './src'),
        };
        return config;
    },
};

export default nextConfig;
