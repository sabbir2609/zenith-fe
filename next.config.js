/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.com',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
            }
        ],
    },
}

module.exports = nextConfig;
