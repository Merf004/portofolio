import { useTranslation } from "react-i18next";
import { experiences } from "../../data/experiences";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";

function formatDate(dateStr, lang) {
  if (!dateStr) return lang === "fr" ? "Présent" : "Present";
  const [year, month] = dateStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="experience" className="section-container">
      <h2 className="section-title">{t("sections.experience")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Mon parcours professionnel" : "My professional journey"}
      </p>

      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot sur la ligne */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-950 z-10 mt-1" />

              {/* Carte */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] glass-card p-6 ${
                  index % 2 === 0
                    ? "md:mr-auto md:ml-0 md:pr-8"
                    : "md:ml-auto md:mr-0 md:pl-8"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {exp.role[lang]}
                    </h3>
                    <p className="text-primary-500 text-sm font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  {exp.current && (
                    <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-500 font-medium">
                      {lang === "fr" ? "Actuel" : "Current"}
                    </span>
                  )}
                </div>

                {/* Méta */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {formatDate(exp.startDate, lang)} — {formatDate(exp.endDate, lang)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>

                {/* Description */}
                <ul className="space-y-1.5 mb-4">
                  {exp.description[lang].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Icône côté opposé (desktop) */}
              <div className={`hidden md:flex md:w-[calc(50%-2rem)] items-start pt-1 ${
                index % 2 === 0 ? "md:ml-auto justify-start pl-8" : "md:mr-auto justify-end pr-8"
              }`}>
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <Briefcase size={18} className="text-primary-500" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}