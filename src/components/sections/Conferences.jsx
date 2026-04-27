import { useState } from "react";
import { useTranslation } from "react-i18next";
import { conferences } from "../../data/conferences";
import {
  CalendarDays, MapPin, ExternalLink,
  Mic, Users, Settings, Images,
  X, ChevronLeft, ChevronRight
} from "lucide-react";

const roleIcon     = { Speaker: Mic, Attendee: Users, Organizer: Settings };
const roleIconFr   = { Intervenant: Mic, Participant: Users, Organisateur: Settings };

function formatDate(dateStr, lang) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    month: "long", year: "numeric",
  });
}

function PhotoModal({ photos, title, onClose }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setCurrent((i) => (i + 1) % photos.length);

  // Fermer avec Escape
  const handleKey = (e) => { if (e.key === "Escape") onClose(); };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {current + 1} / {photos.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Image principale */}
        <div className="relative bg-black aspect-video">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} — photo ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                i === current ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
          ))}

          {/* Flèches */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Vignettes */}
        {photos.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {photos.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden ring-2 transition-all ${
                  i === current
                    ? "ring-primary-500 opacity-100"
                    : "ring-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={src} alt={`vignette ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Conferences() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";
  const [modalConf, setModalConf] = useState(null);

  return (
    <section id="conferences" className="section-container">
      <h2 className="section-title">{t("sections.conferences")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Événements auxquels j'ai participé" : "Events I've attended or spoken at"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.map((conf) => {
          const roleLabel = conf.role[lang];
          const icons     = lang === "fr" ? roleIconFr : roleIcon;
          const RoleIcon  = icons[roleLabel] || Mic;
          const hasPhotos = conf.photos && conf.photos.length > 0;

          return (
            <div key={conf.id} className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300">

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                    {conf.title}
                  </h3>
                  <p className="text-sm text-primary-500 font-medium">{conf.event}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-primary-500/10 text-primary-500 font-medium">
                  <RoleIcon size={12} />
                  {roleLabel}
                </div>
              </div>

              {/* Méta */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  {formatDate(conf.date, lang)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {conf.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {conf.description[lang]}
              </p>

              {/* Actions */}
              {(conf.link || hasPhotos) && (
                <div className="flex items-center gap-3 flex-wrap">
                  {conf.link && (
                    <a
                      href={conf.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary-500 hover:underline font-medium"
                    >
                      <ExternalLink size={12} />
                      {lang === "fr" ? "Voir l'événement" : "View event"}
                    </a>
                  )}

                  {hasPhotos && (
                    <button
                      onClick={() => setModalConf(conf)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 transition-all"
                    >
                      <Images size={12} />
                      {lang === "fr" ? "Photos" : "Pictures"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalConf && (
        <PhotoModal
          photos={modalConf.photos}
          title={modalConf.title}
          onClose={() => setModalConf(null)}
        />
      )}
    </section>
  );
}