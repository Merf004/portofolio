import { useTranslation } from "react-i18next";
import { services } from "../../data/services";
import DynamicIcon from "../../utils/iconMap";

export default function Services() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="services" className="section-container">
      <h2 className="section-title">{t("sections.services")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Ce que je propose" : "What I offer"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icône */}
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-5 group-hover:bg-primary-500/20 transition-colors">
              <DynamicIcon name={service.icon} size={22} className="text-primary-500" />
            </div>

            {/* Titre */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {service.title[lang]}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {service.description[lang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}