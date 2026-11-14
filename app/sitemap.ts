import type { MetadataRoute } from "next";

const base = "https://marvextechnologies.com"; // TODO: confirm client domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/clients", "/process", "/contact"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: "2026-11-14",
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
