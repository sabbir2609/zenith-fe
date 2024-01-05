/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com', // Change to a string
            },
            {
                protocol: 'https',
                hostname: 'flowbite.com', // Change to a string
            }
        ],
    },
}

module.exports = nextConfig;
