const videos = [
  {
    src: "/videos/merule-traitement-1.mp4",
    title: "Traitement de la mérule",
    comment:
      "La mérule demande une prise en charge sérieuse. Découvrez en vidéo le savoir-faire ACO-HABITAT consacré à la protection des bois et des charpentes.",
    poster: "/images/merule.png",
  },
  {
    src: "/videos/merule-traitement-2.mp4",
    title: "La mérule : une intervention en images",
    comment:
      "Chaque situation est différente. Ces images vous donnent un aperçu concret de notre métier et de notre approche du traitement du bois.",
    poster: "/images/merule.png",
  },
]

export function VideosSection() {
  return (
    <section id="videos" className="border-t border-border bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            En images
          </span>
          <h2
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            La mérule et son traitement
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Découvrez deux vidéos autour du traitement de la mérule et du savoir-faire ACO-HABITAT.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <article
              key={video.src}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <video
                className="aspect-video w-full bg-foreground object-contain"
                controls
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
              <div className="flex flex-col gap-2 p-5 sm:p-6">
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {video.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{video.comment}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
