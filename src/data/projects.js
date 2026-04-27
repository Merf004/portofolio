import projet11 from "../assets/images/projet11.png";
import projet12 from "../assets/images/projet12.png";
import projet13 from "../assets/images/projet13.png";
import projet21 from "../assets/images/projet21.jpeg";
import projet22 from "../assets/images/projet22.jpeg";
import projet23 from "../assets/images/projet23.jpeg";
import projet31 from "../assets/images/projet31.jpeg";

export const projects = [
  {
    id: 1,
    title: "Médecin virtuel",
    profile: "data-scientist", // lie le projet à un profil
    images: [projet11, projet12, projet13],
    description: {
      en: "Web application for detecting malaria based on images of blood smears examined under a microscope",
      fr: "Application web pour détecter le paludisme basé sur les images de frottis sanguins examinés sous un microscope",
    },
    tags: ["Python", "Scikit-learn", "TensorFlow", "OpenCV", "React js", "Pandas"],
    github: "https://github.com/Merf004/Medecin-Virtuel",
    featured: true,
  },

  {
    id: 2,
    title: "CrimeTrend",
    profile: "data-scientist", // lie le projet à un profil
    images: [projet21, projet22, projet23],
    description: {
      en: " Web application for predicting crime rates in Maryland counties in the U.S. ",
      fr: "Application web pour prédire les taux de criminalité dans les comtés du Maryland aux États-Unis. ",
    },
    tags: ["Python", "Scikit-learn", "Numpy", "Streamlit", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/Merf004/CrimeTrend",
    featured: true,
  },

  {
    id: 3,
    title: "Unicefs-docs",
    profile: "Dev AI", // lie le projet à un profil
    images: [projet31],    
    description: {
      en: "UNICEF Knowledge Management Platform: Platform to make public documents related to children's rights available, integrating an intelligent chatbot to analyze the document on behalf of the user and answer questions",
      fr: "Plateforme de gestion des connaissances UNICEF : Plateforme pour mettre à la disposition du public des documents relatifs aux droits des enfants intégrant un chatbot intélligent pour analyser les document en lieu et place de l’utilisateur et repondre aux questions ",
    },
    tags: ["Python", "Scikit-learn", "Pandas"],
    github: "https://github.com/Merf004/unicefs-docs",
    featured: true,
  },

];