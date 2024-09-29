import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "whatsriskmanagement",
    short_name: "whatsriskmanagement",
    description: "helping you manage your risk while trading.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f7931a",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
