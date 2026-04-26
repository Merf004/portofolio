import { useTheme } from "./theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold section-title">
        Portfolio — Config OK
      </h1>

      <div className="flex gap-4">
        <button onClick={toggleTheme} className="btn-primary">
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <button
          onClick={() => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")}
          className="btn-outline"
        >
          {i18n.language === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
        </button>
      </div>

      <p className="text-gray-500 dark:text-gray-400">
        Thème actif : <strong>{theme}</strong> | Langue : <strong>{i18n.language}</strong>
      </p>
    </div>
  );
}