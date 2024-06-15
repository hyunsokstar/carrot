/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "imagedelivery.net",
            }
        ],
    },
};


export default nextConfig;