import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACO-HABITAT - Diagnostic Toiture par IA",
    short_name: "ACO-HABITAT Diag",
    description:
      "Diagnostic de votre toiture par intelligence artificielle pour 59,90\u20AC. Analyse satellite, detection de problemes et rapport en 30 secondes.",
    start_url: "/",
    display: "standalone",
    background_color: "#060a13",
    theme_color: "#060a13",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
