import { useTranslation } from "react-i18next";
import { profiles } from "../../data/profiles";
import DynamicIcon from "../../utils/iconMap";

export default function Profiles() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="profiles" className="section-container">
      <h2 className="section-title">{t("sections.profiles")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Ce que je fais" : "What I do"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {profiles.map((p) => (
          <div key={p.id} className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300">

            {/* Icône */}
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
              <DynamicIcon name={p.icon} size={22} className="text-primary-500" />
            </div>

            {/* Titre */}
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {p.title[lang]}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              {p.description[lang]}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}