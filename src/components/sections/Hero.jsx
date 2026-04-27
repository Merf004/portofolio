import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "../../data/profile";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";
  const rolesFromI18n = t("hero.roles", { returnObjects: true });
  const roles = Array.isArray(rolesFromI18n) ? rolesFromI18n : [String(rolesFromI18n)];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Effet machine à écrire
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex, roles]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Fond subtil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

          {/* ── Colonne gauche : texte ── */}
          <div className="flex-1 text-center lg:text-left">

            <p className="text-sm font-mono text-primary-500 tracking-widest uppercase mb-4">
              {t("hero.greeting")}
            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
              {profile.name}
            </h1>

            {/* Rôle animé */}
            <div className="h-10 flex items-center justify-center lg:justify-start mb-6">
              <span className="text-xl md:text-2xl font-mono text-primary-500">
                {displayed}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="max-w-lg text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-10">
              {profile.bio[lang]}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href={profile.cv[lang]}
                download
                className="btn-primary flex items-center gap-2"
              >
                <Download size={16} />
                {t("hero.cta_primary")}
              </a>
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline flex items-center gap-2"
              >
                <Mail size={16} />
                {t("hero.cta_secondary")}
              </button>
            </div>
          </div>

          {/* ── Colonne droite : photos ── */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">

              {/* Anneau extérieur tournant */}
              <div
                className="absolute inset-0 rounded-full animate-spin [animation-duration:8s]"
                style={{
                  background: "conic-gradient(from 0deg, transparent 60%, #0ea5e9 100%)",
                }}
              />

              {/* Cache l'intérieur du conic extérieur */}
              <div className="absolute inset-1.5 rounded-full bg-white dark:bg-gray-950" />

              {/* Anneau intérieur tournant inverse */}
              <div
                className="absolute inset-2 rounded-full animate-spin [animation-duration:6s] [animation-direction:reverse]"
                style={{
                  background: "conic-gradient(from 180deg, transparent 70%, #8b5cf6 100%)",
                }}
              />

              {/* Cache l'intérieur du conic intérieur */}
              <div className="absolute inset-3.5 rounded-full bg-white dark:bg-gray-950" />

              {/* Lueur pulsante */}
              <div className="absolute inset-4 rounded-full bg-primary-500/20 blur-xl animate-pulse" />

              {/* Photo — pile dans le cercle */}
              <div className="absolute inset-4 rounded-full overflow-hidden ring-2 ring-primary-500/40 shadow-2xl shadow-primary-500/20">
                <img
                  src={profile.photos[1]}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Overlay shimmer */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "linear-gradient(135deg, transparent 40%, #0ea5e9 50%, transparent 60%)",
                    backgroundSize: "200% 200%",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Points orbitaux */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div
                  key={deg}
                  className="absolute w-3 h-3 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-6px",
                    marginLeft: "-6px",
                    animation: "orbit 8s linear infinite",
                    animationDelay: `${-i * (8 / 5)}s`,
                    transformOrigin: "6px 6px",
                    transform: `rotate(${deg}deg) translateX(148px)`,
                  }}
                />
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown size={20} className="text-gray-400" />
      </div>
    </section>
  );
}