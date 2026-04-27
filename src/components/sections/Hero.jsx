import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "../../data/profile";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const roles = t("hero.roles", { returnObjects: true });
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

              {/* Cercle décoratif tournant */}
              <div className="absolute inset-0 rounded-full border border-dashed border-primary-500/30 animate-spin [animation-duration:20s]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-primary-500/15 animate-spin [animation-duration:15s] [animation-direction:reverse]" />

              {/* Points décoratifs sur le cercle */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full bg-primary-500/40"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)`,
                    marginTop: "-4px",
                    marginLeft: "-4px",
                  }}
                />
              ))}

              {/* Photo principale */}
              <div className="absolute inset-8 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary-500/20">
                <img
                  src={profile.photos[1]}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

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