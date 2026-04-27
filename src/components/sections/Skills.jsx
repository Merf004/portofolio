import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { skills } from "../../data/skills";
import DynamicIcon from "../../utils/iconMap";

function importIcon(filename) {
  return new URL(`../../assets/skills/${filename}`, import.meta.url).href;
}

function SkillCard({ name, level, img }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 cursor-default"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src={importIcon(img)}
          alt={name}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
        />
      </div>
      <p className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
        {name}
      </p>

      {/* Overlay niveau au hover */}
      <div
        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300"
        style={{
          background: "rgba(14, 165, 233, 0.92)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
          <circle
            cx="26" cy="26" r="22"
            fill="none" stroke="white" strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - level / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 26 26)"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
          <text x="26" y="26" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="600">
            {level}%
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function Skills() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const categories = Object.values(skills);
  const [activeTab, setActiveTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0); // 👈 force reset animation
  const containerRef = useRef(null);

  const active = categories[activeTab];

  // Reset animation à chaque changement de tab
  const handleTabChange = (i) => {
    setActiveTab(i);
    setAnimKey((k) => k + 1); // 👈 recrée le DOM → reset animation
  };

  // Taille responsive du carousel
  const [size, setSize] = useState(600);
  const [radius, setRadius] = useState(220);
  const [cardSize, setCardSize] = useState(90);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setSize(280); setRadius(100); setCardSize(60);
      } else if (w < 640) {
        setSize(340); setRadius(125); setCardSize(68);
      } else if (w < 768) {
        setSize(420); setRadius(155); setCardSize(75);
      } else if (w < 1024) {
        setSize(520); setRadius(190); setCardSize(82);
      } else {
        setSize(620); setRadius(230); setCardSize(90);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const duration = 60;

  return (
    <section id="skills" className="section-container overflow-hidden">
      <style>{`
        @keyframes rotateContainer {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes counterRotate {
          from { transform: translate(var(--tx), var(--ty)) rotate(0deg); }
          to   { transform: translate(var(--tx), var(--ty)) rotate(-360deg); }
        }
        .skills-ring {
          animation: rotateContainer ${duration}s linear infinite;
        }
        .skills-ring.paused {
          animation-play-state: paused;
        }
        .skills-ring.paused .skill-node {
          animation-play-state: paused;
        }
        .skill-node {
          position: absolute;
          top: 50%;
          left: 50%;
          animation: counterRotate ${duration}s linear infinite;
        }
      `}</style>

      <h2 className="section-title">{t("sections.skills")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Mes compétences techniques" : "My technical skills"}
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleTabChange(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === i
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                : "bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500/50"
            }`}
          >
            <DynamicIcon name={cat.icon} size={15} />
            {cat.label[lang]}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="flex justify-center">
        <div
          style={{ width: size, height: size, position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cercles décoratifs */}
          <div
            className="absolute rounded-full border border-dashed border-primary-500/20"
            style={{ inset: 0 }}
          />
          <div
            className="absolute rounded-full border border-primary-500/10"
            style={{ inset: size * 0.1 }}
          />

          {/* Conteneur rotatif — key force le remount à chaque tab */}
          <div
            key={animKey}
            ref={containerRef}
            className={`skills-ring ${paused ? "paused" : ""}`}
            style={{ width: size, height: size, position: "relative" }}
          >
            {active.items.map((skill, index) => {
              const total = active.items.length;
              const angle = (index / total) * 360;
              const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
              const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

              return (
                <div
                  key={`${activeTab}-${skill.name}`}
                  className="skill-node"
                  style={{
                    "--tx": `calc(-50% + ${x}px)`,
                    "--ty": `calc(-50% + ${y}px)`,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    width: cardSize,
                    height: cardSize,
                  }}
                >
                  <SkillCard name={skill.name} level={skill.level} img={skill.img} />
                </div>
              );
            })}
          </div>

          {/* Centre */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="rounded-full border border-primary-500/30 flex items-center justify-center bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm"
              style={{ width: size * 0.22, height: size * 0.22 }}
            >
              <div className="text-center">
                <p
                  className="font-bold text-primary-500 tracking-widest"
                  style={{ fontSize: size * 0.03 }}
                >
                  SKILLS
                </p>
                <div className="flex gap-1 justify-center mt-1">
                  {[0, 0.2, 0.4].map((delay) => (
                    <div
                      key={delay}
                      className="rounded-full bg-primary-500 animate-pulse"
                      style={{ width: size * 0.018, height: size * 0.018, animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Légende */}
      <div className="mt-8 flex flex-col items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500/20 border border-primary-500/40" />
          {lang === "fr" ? "Survolez pour voir le niveau" : "Hover to see the level"}
        </div>
      </div>
    </section>
  );
}