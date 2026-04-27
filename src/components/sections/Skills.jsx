import { useTranslation } from "react-i18next";
import { skills } from "../../data/skills";
import DynamicIcon from "../../utils/iconMap";

function SkillBar({ name, level }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-xs text-primary-500 font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          {level}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">{t("sections.skills")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Mes compétences techniques" : "My technical skills"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Object.values(skills).map((category) => (
          <div key={category.icon} className="glass-card p-6">

            {/* Header catégorie */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <DynamicIcon name={category.icon} size={20} className="text-primary-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {category.label[lang]}
              </h3>
            </div>

            {/* Barres de compétences */}
            <div className="space-y-4">
              {category.items.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}