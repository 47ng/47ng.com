// @ts-check

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: 'https://github.com/47ng',
      permanent: false,
    },
  ],
}

export default config
