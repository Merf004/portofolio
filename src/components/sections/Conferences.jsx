import { useTranslation } from "react-i18next";
import { conferences } from "../../data/conferences";
import { CalendarDays, MapPin, ExternalLink, Mic, Users, Settings } from "lucide-react";

const roleIcon = { Speaker: Mic, Attendee: Users, Organizer: Settings };
const roleIconFr = { Intervenant: Mic, Participant: Users, Organisateur: Settings };

function formatDate(dateStr, lang) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Conferences() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="conferences" className="section-container">
      <h2 className="section-title">{t("sections.conferences")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Événements auxquels j'ai participé" : "Events I've attended or spoken at"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.map((conf) => {
          const roleLabel = conf.role[lang];
          const icons = lang === "fr" ? roleIconFr : roleIcon;
          const RoleIcon = icons[roleLabel] || Mic;

          return (
            <div key={conf.id} className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300">

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                    {conf.title}
                  </h3>
                  <p className="text-sm text-primary-500 font-medium">
                    {conf.event}
                  </p>
                </div>

                {/* Badge rôle */}
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
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {conf.description[lang]}
              </p>

              {/* Lien */}
              {conf.link && (
                <a
                  href={conf.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs text-primary-500 hover:underline font-medium"
                >
                  <ExternalLink size={12} />
                  {lang === "fr" ? "Voir l'événement" : "View event"}
                </a>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
}