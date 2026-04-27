import { useState } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { ChevronLeft, ChevronRight, GitBranch, Maximize2 } from "lucide-react";
import Modal from "../ui/Modal";

function ImageCarousel({ images, title, onExpand }) {
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
    <div className="relative w-full h-48 rounded-xl overflow-hidden group cursor-pointer" onClick={onExpand}>
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

      {/* Bouton agrandir */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpand();
        }}
        className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        title="Agrandir"
      >
        <Maximize2 size={18} />
      </button>

      {/* Contrôles carousel */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRight size={14} />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState(0);

  const filters = [
    { id: "all", label: { en: "All", fr: "Tous" } },
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
              <ImageCarousel 
                images={project.images} 
                title={project.title}
                onExpand={() => {
                  setSelectedProject(project);
                  setExpandedImageIndex(0);
                }}
              />
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

      {/* Modal projet aggrandi */}
      <Modal 
        isOpen={selectedProject !== null} 
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Images agrandies */}
            <div>
              <div className="relative w-full h-96 rounded-xl overflow-hidden group mb-4">
                {selectedProject.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${selectedProject.title} ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      i === expandedImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  />
                ))}

                {/* Contrôles */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setExpandedImageIndex((i) => (i - 1 + selectedProject.images.length) % selectedProject.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setExpandedImageIndex((i) => (i + 1) % selectedProject.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Indicateurs */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setExpandedImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === expandedImageIndex
                              ? "bg-white w-4"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Contenu projet */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedProject.title}
              </h2>
              {selectedProject.featured && (
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 font-medium mb-4">
                  {lang === "fr" ? "Vedette" : "Featured"}
                </span>
              )}

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {selectedProject.description[lang]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Lien GitHub */}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors font-medium"
                >
                  <GitBranch size={18} />
                  Voir sur GitHub
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}