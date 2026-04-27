import { useTranslation } from "react-i18next";
import { profile } from "../../data/profile";
import githubIcon from "../../assets/icons/github.png";
import linkedinIcon from "../../assets/icons/linkedin.png";
import twitterIcon from "../../assets/icons/twitter.png";
import facebookIcon from "../../assets/icons/facebook.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";

export default function Footer() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";
  const year = new Date().getFullYear();

  const socials = [
    { icon: githubIcon,   href: profile.socials.github,   label: "GitHub" },
    { icon: linkedinIcon, href: profile.socials.linkedin, label: "LinkedIn" },
    { icon: twitterIcon,  href: profile.socials.twitter,   label: "Twitter/X" },
    { icon: facebookIcon, href: "https://www.facebook.com/share/14ikMxXkHqz/?mibextid=wwXIfr", label: "Facebook" },
    { icon: whatsappIcon, href: "https://wa.me/237698932184", label: "WhatsApp" },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {year} {profile.name}. {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all"
            >
              <img src={icon} alt={label} width="25" height="25" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}