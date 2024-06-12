/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
        ],
    },
};


export default nextConfig;