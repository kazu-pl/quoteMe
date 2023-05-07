/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // this register this url as a host that Next can use to serve remote images
  images: {
    domains: [process.env.NEXT_PUBLIC_API_URL],
  },

  // Allows to use SVG as ReactComponent
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      // test: /\.(js|ts)x?$/,
      // },
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};

module.exports = nextConfig;
