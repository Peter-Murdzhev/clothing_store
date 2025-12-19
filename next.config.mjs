/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['http://10.52.42.65:3000'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    // experimental: {
    //     serverActions: true,
    // }
};

export default nextConfig;
