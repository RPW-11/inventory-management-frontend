/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'inventory-management-bucket.s3.amazonaws.com'
            }
        ]
    }
};

export default nextConfig;
