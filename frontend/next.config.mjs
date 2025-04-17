/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
    esmExternals: true,
    gzipSize: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://*.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https://web3-api.magickbase.com https://web3-api-sta.magickbase.com https://explorer.rgbpp.io https://www.google-analytics.com https://stats.g.doubleclick.net https://vercel.live https://*.vercel.app wss://*.vercel.app http://localhost:*  https://localhost:*  https://explorer.rgbpp.io/* ws://localhost:* wss://localhost:*; frame-src 'self' https://www.google.com https://vercel.live; worker-src 'self' blob:; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false,
              template(variables, { tpl }) {
                return tpl`
                ${variables.imports};
                import { styled } from 'styled-system/jsx';
                
                ${variables.interfaces};
                
                const ${variables.componentName} = styled((${variables.props}) => (
                  ${variables.jsx}
                ));
                
                ${variables.exports};`
              },
            },
          },
        ],
      },
    )
    fileLoaderRule.exclude = /\.svg$/i
    return config
  },
}

export default nextConfig
