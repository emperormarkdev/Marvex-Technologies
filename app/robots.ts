import type { MetadataRoute } from "next";

const base = "https://marvextechnologies.com"; // TODO: confirm client domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
