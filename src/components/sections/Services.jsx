import { useState } from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../data/services";
import DynamicIcon from "../../utils/iconMap";
import { X, CheckCircle2 } from "lucide-react";

function ServiceModal({ service, lang, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-primary-500 px-8 py-6">
          {/* Cercle décoratif */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <DynamicIcon name={service.icon} size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs font-mono tracking-widest uppercase mb-1">
                  {lang === "fr" ? "Service" : "Service"}
                </p>
                <h3 className="text-white text-xl font-bold leading-tight">
                  {service.title[lang]}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
            {service.description[lang]}
          </p>

          {/* Liste des détails */}
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            {lang === "fr" ? "Ce qui est inclus" : "What's included"}
          </p>

          <ul className="space-y-3">
            {service.details[lang].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{
                  animation: `slideUp 0.3s ease forwards`,
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                }}
              >
                <CheckCircle2
                  size={17}
                  className="text-primary-500 shrink-0 mt-0.5"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            {lang === "fr"
              ? "Intéressé ? Contactez-moi."
              : "Interested? Get in touch."}
          </p>
          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }}
            className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
          >
            {lang === "fr" ? "Me contacter" : "Contact me"}
          </button>
        </div>

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [hovered, setHovered] = useState(null);
  const [modalService, setModalService] = useState(null);

  return (
    <section id="services" className="section-container">
      <h2 className="section-title">{t("sections.services")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Ce que je propose" : "What I offer"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const isHovered = hovered === service.id;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm cursor-default transition-all duration-500 group"
              style={{
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered
                  ? "0 20px 40px rgba(14,165,233,0.12), 0 0 0 1px rgba(14,165,233,0.2)"
                  : "none",
              }}
            >
              {/* Fond animé */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(ellipse at top left, rgba(14,165,233,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Numéro décoratif */}
              <div className="absolute top-4 right-5 font-mono text-6xl font-bold text-gray-100 dark:text-gray-800 select-none transition-all duration-500 group-hover:text-primary-500/10">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative p-8">

                {/* Icône + ligne */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0"
                    style={{
                      background: isHovered
                        ? "rgba(14,165,233,1)"
                        : "rgba(14,165,233,0.1)",
                    }}
                  >
                    <DynamicIcon
                      name={service.icon}
                      size={24}
                      className="transition-colors duration-500"
                      style={{ color: isHovered ? "#ffffff" : "#0ea5e9" }}
                    />
                  </div>
                  <div
                    className="h-px flex-1 transition-all duration-700"
                    style={{
                      background: isHovered
                        ? "linear-gradient(to right, #0ea5e9, transparent)"
                        : "linear-gradient(to right, rgba(14,165,233,0.2), transparent)",
                    }}
                  />
                </div>

                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-primary-500">
                  {service.title[lang]}
                </h3>

                {/* Séparateur */}
                <div
                  className="h-0.5 mb-4 rounded-full transition-all duration-500"
                  style={{
                    width: isHovered ? "48px" : "24px",
                    background: "#0ea5e9",
                  }}
                />

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {service.description[lang]}
                </p>

                {/* Bouton Learn more */}
                <button
                  onClick={() => setModalService(service)}
                  className="mt-6 flex items-center gap-2 transition-all duration-500 group/btn"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(6px)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                  <span className="text-xs font-medium text-primary-500 group-hover/btn:underline">
                    {lang === "fr" ? "En savoir plus →" : "Learn more →"}
                  </span>
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalService && (
        <ServiceModal
          service={modalService}
          lang={lang}
          onClose={() => setModalService(null)}
        />
      )}
    </section>
  );
}