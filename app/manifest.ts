import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marvex Technologies",
    short_name: "Marvex",
    description:
      "We design and build modern websites, mobile apps, online stores, and custom business software.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00c47a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

