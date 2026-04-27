import { useTranslation } from "react-i18next";
import { education } from "../../data/education";
import { GraduationCap, CalendarDays, MapPin, Award } from "lucide-react";

function formatDate(dateStr, lang) {
  if (!dateStr) return lang === "fr" ? "Présent" : "Present";
  const [year, month] = dateStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="education" className="section-container">
      <h2 className="section-title">{t("sections.education")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Mon parcours académique" : "My academic background"}
      </p>

      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />

        <div className="space-y-10">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
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
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {edu.degree[lang]}
                  </h3>
                  <p className="text-primary-500 text-sm font-medium mt-0.5">
                    {edu.school}
                  </p>
                </div>

                {/* Méta */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {formatDate(edu.startDate, lang)} — {formatDate(edu.endDate, lang)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {edu.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {edu.description[lang]}
                </p>

                {/* Mention */}
                {edu.honors && (
                  <div className="flex items-center gap-1.5 text-xs text-primary-500 font-medium">
                    <Award size={13} />
                    {edu.honors[lang]}
                  </div>
                )}
              </div>

              {/* Icône côté opposé (desktop) */}
              <div className={`hidden md:flex md:w-[calc(50%-2rem)] items-start pt-1 ${
                index % 2 === 0 ? "md:ml-auto justify-start pl-8" : "md:mr-auto justify-end pr-8"
              }`}>
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-primary-500" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}