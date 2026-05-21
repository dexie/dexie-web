import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cloud/privacy",
        destination: "/privacy",
        permanent: false,
      },
      {
        source: "/cloud/terms",
        destination: "/terms",
        permanent: false,
      },
      {
        source: "/cloud/docs/:path*",
        destination: "/docs/cloud/:path*",
        permanent: false,
      },
      {
        source: "/docs/cloud/pricing",
        destination: "/pricing",
        permanent: false,
      },
      {
        source: "/cloud/pricing",
        destination: "/pricing",
        permanent: false,
      },
      {
        source: "/:path*.html",
        destination: "/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
