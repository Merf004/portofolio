import { useTranslation } from "react-i18next";
import { profile } from "../../data/profile";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const infos = [
    { icon: MapPin, label: profile.location[lang] },
    { icon: Mail,   label: profile.email },
    { icon: Phone,  label: profile.phone },
  ];

  return (
    <section id="about" className="section-container">
      <h2 className="section-title">{t("sections.about")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Qui suis-je ?" : "Who am I?"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Texte */}
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {profile.bio[lang]}
          </p>

          {/* Infos de contact */}
          <div className="space-y-3 pt-2">
            {infos.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Icon size={16} className="text-primary-500 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Réseaux sociaux */}
          <div className="flex gap-3 pt-2">
            {Object.entries(profile.socials).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all"
              >
                <ExternalLink size={12} />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "3+",  label: { en: "Years of experience", fr: "Ans d'expérience" } },
            { value: "20+", label: { en: "Projects completed",  fr: "Projets réalisés"  } },
            { value: "10+", label: { en: "Clients served",      fr: "Clients servis"    } },
            { value: "5+",  label: { en: "Certifications",      fr: "Certifications"    } },
          ].map(({ value, label }) => (
            <div key={value} className="glass-card p-6 text-center">
              <p className="text-4xl font-bold text-primary-500 mb-1">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label[lang]}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}