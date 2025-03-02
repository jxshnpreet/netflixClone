/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "image.tmdb.org",
                port: "",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: ""
            }
        ]
    }
};

export default nextConfig;
