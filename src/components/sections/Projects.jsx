import { useState } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { profiles } from "../../data/profiles";
import { GitBranch, ChevronLeft, ChevronRight } from "lucide-react";

function ImageCarousel({ images, title }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    );
  }

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden group">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {/* Contrôles carousel */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRight size={14} />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current
                    ? "bg-white w-3"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: { en: "All", fr: "Tous" } },
    ...profiles.map((p) => ({ id: p.id, label: p.title })),
  ];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.profile === activeFilter);

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">{t("sections.projects")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Mes réalisations" : "My work"}
      </p>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeFilter === f.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {f.label[lang] || f.label}
          </button>
        ))}
      </div>

      {/* Grille projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300"
          >
            {/* Carousel images */}
            <div className="p-4 pb-0">
              <ImageCarousel images={project.images} title={project.title} />
            </div>

            {/* Contenu */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white leading-snug">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 font-medium">
                    {lang === "fr" ? "Vedette" : "Featured"}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {project.description[lang]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Lien GitHub */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors font-medium"
                >
                  <GitBranch size={13} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}