import { useState } from "react";
import { useTranslation } from "react-i18next";
import { profile } from "../../data/profile";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simule un envoi (à remplacer par une vraie API ex: EmailJS, Formspree)
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  const infos = [
    { icon: Mail,   label: profile.email },
    { icon: Phone,  label: profile.phone },
    { icon: MapPin, label: profile.location[lang] },
  ];

  const labels = {
    name:    { en: "Full name",   fr: "Nom complet" },
    email:   { en: "Email",       fr: "Email" },
    subject: { en: "Subject",     fr: "Sujet" },
    message: { en: "Message",     fr: "Message" },
    send:    { en: "Send message", fr: "Envoyer le message" },
    sending: { en: "Sending...",  fr: "Envoi en cours..." },
    success: {
      en: "Message sent! I'll get back to you soon.",
      fr: "Message envoyé ! Je vous répondrai bientôt.",
    },
  };

  return (
    <section id="contact" className="section-container">
      <h2 className="section-title">{t("sections.contact")}</h2>
      <p className="section-subtitle">
        {lang === "fr" ? "Travaillons ensemble" : "Let's work together"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Infos de contact */}
        <div className="space-y-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {lang === "fr"
              ? "Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter, je serai ravi d'échanger avec vous."
              : "Have a project in mind or a question? Feel free to reach out, I'd love to hear from you."}
          </p>

          <div className="space-y-4">
            {infos.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary-500" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <div className="glass-card p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
              <CheckCircle size={48} className="text-primary-500" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {labels.success[lang]}
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="btn-outline text-sm"
              >
                {lang === "fr" ? "Nouveau message" : "New message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "subject"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {labels[field][lang]}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    placeholder={labels[field][lang]}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {labels.message[lang]}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
                  placeholder={labels.message[lang]}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send size={16} />
                {loading ? labels.sending[lang] : labels.send[lang]}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}