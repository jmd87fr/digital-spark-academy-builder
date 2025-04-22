
export interface Formation {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  videoTeaserUrl: string;
  category: 'chatgpt' | 'midjourney' | 'stable-diffusion' | 'dall-e' | 'autre';
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: number; // in hours
  prerequisites: string[];
  learningObjectives: string[];
  modules: {
    title: string;
    description: string;
    duration: number; // in minutes
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
  }[];
  moodleLink: string;
  imageUrl: string;
}

const formations: Formation[] = [
  {
    id: "chatgpt-mastery",
    title: "Maîtrisez ChatGPT pour booster votre productivité",
    shortDescription: "Découvrez comment utiliser ChatGPT efficacement dans votre quotidien professionnel",
    longDescription: "Cette formation complète vous permettra d'exploiter tout le potentiel de ChatGPT dans votre environnement professionnel. Vous apprendrez à formuler des prompts efficaces, automatiser des tâches répétitives, et créer des workflows intelligents pour gagner du temps et améliorer la qualité de votre travail.",
    price: 199,
    videoTeaserUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "chatgpt",
    level: "débutant",
    duration: 6,
    prerequisites: ["Aucun prérequis technique", "Connaissance de base de l'informatique"],
    learningObjectives: [
      "Maîtriser l'art des prompts efficaces",
      "Automatiser des tâches quotidiennes",
      "Générer du contenu de qualité professionnelle",
      "Intégrer ChatGPT dans votre workflow existant"
    ],
    modules: [
      {
        title: "Introduction à ChatGPT",
        description: "Découvrez les fondamentaux de ChatGPT et son fonctionnement",
        duration: 45
      },
      {
        title: "L'art des prompts",
        description: "Apprenez à formuler des prompts efficaces pour obtenir les meilleurs résultats",
        duration: 90
      },
      {
        title: "Automatisation des tâches",
        description: "Utilisez ChatGPT pour automatiser vos tâches répétitives",
        duration: 120
      },
      {
        title: "Génération de contenu",
        description: "Créez du contenu professionnel avec l'aide de ChatGPT",
        duration: 90
      },
      {
        title: "Intégration dans votre workflow",
        description: "Intégrez ChatGPT dans votre environnement de travail existant",
        duration: 60
      }
    ],
    testimonials: [
      {
        name: "Sophie Martin",
        role: "Responsable marketing",
        content: "Cette formation a complètement changé ma façon de travailler. Je gagne un temps précieux chaque jour grâce aux techniques apprises."
      },
      {
        name: "Thomas Dubois",
        role: "Entrepreneur",
        content: "Les astuces pour formuler des prompts efficaces valent à elles seules le prix de la formation. Indispensable !"
      }
    ],
    moodleLink: "https://moodle.formations-digitales.fr/course/chatgpt-mastery",
    imageUrl: "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "midjourney-art",
    title: "Créez des visuels professionnels avec Midjourney",
    shortDescription: "Apprenez à générer des images de qualité professionnelle avec l'IA",
    longDescription: "Dans cette formation vous découvrirez comment utiliser Midjourney pour créer des visuels de qualité professionnelle. De la rédaction de prompts efficaces aux techniques avancées de composition et de style, vous maîtriserez tous les aspects de cette IA révolutionnaire pour créer des visuels qui démarqueront votre marque.",
    price: 249,
    videoTeaserUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "midjourney",
    level: "intermédiaire",
    duration: 8,
    prerequisites: ["Connaissance de base en design", "Compte Discord"],
    learningObjectives: [
      "Maîtriser l'écriture de prompts visuels",
      "Comprendre les paramètres et styles de Midjourney",
      "Créer des visuels cohérents pour votre marque",
      "Optimiser vos images pour différentes plateformes"
    ],
    modules: [
      {
        title: "Introduction à Midjourney",
        description: "Découvrez l'interface et le fonctionnement de base de Midjourney",
        duration: 60
      },
      {
        title: "L'art des prompts visuels",
        description: "Apprenez à formuler des prompts qui génèrent exactement le style visuel recherché",
        duration: 120
      },
      {
        title: "Paramètres et styles avancés",
        description: "Maîtrisez les paramètres qui affectent le rendu final de vos images",
        duration: 90
      },
      {
        title: "Création d'identité visuelle",
        description: "Créez des visuels cohérents pour votre marque ou vos projets",
        duration: 120
      },
      {
        title: "Post-traitement et optimisation",
        description: "Améliorez vos images générées avec des outils complémentaires",
        duration: 90
      }
    ],
    testimonials: [
      {
        name: "Julie Leroy",
        role: "Graphiste indépendante",
        content: "Cette formation m'a permis de proposer de nouveaux services à mes clients. Un excellent investissement pour mon activité."
      },
      {
        name: "Marc Dupont",
        role: "Responsable communication",
        content: "Nous économisons des milliers d'euros en production visuelle grâce aux techniques apprises dans cette formation."
      }
    ],
    moodleLink: "https://moodle.formations-digitales.fr/course/midjourney-art",
    imageUrl: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "stable-diffusion-local",
    title: "Stable Diffusion en local : contrôle total et confidentialité",
    shortDescription: "Installez et maîtrisez Stable Diffusion sur votre propre machine",
    longDescription: "Cette formation technique vous guidera pas à pas pour installer et configurer Stable Diffusion sur votre propre ordinateur. Vous apprendrez à personnaliser l'IA avec vos propres modèles, à optimiser les performances et à générer des images en toute confidentialité, sans dépendre des services en ligne.",
    price: 349,
    videoTeaserUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "stable-diffusion",
    level: "avancé",
    duration: 10,
    prerequisites: ["Connaissances informatiques de base", "PC avec carte graphique compatible CUDA (min 8GB VRAM)"],
    learningObjectives: [
      "Installer et configurer Stable Diffusion sur votre machine",
      "Comprendre les différents modèles et extensions",
      "Créer des images personnalisées en local",
      "Optimiser les performances et les résultats"
    ],
    modules: [
      {
        title: "Installation et configuration",
        description: "Installez Stable Diffusion et configurez votre environnement",
        duration: 120
      },
      {
        title: "Modèles et fine-tuning",
        description: "Découvrez les différents modèles et comment les personnaliser",
        duration: 150
      },
      {
        title: "Extensions et plugins",
        description: "Améliorez Stable Diffusion avec des extensions puissantes",
        duration: 90
      },
      {
        title: "Techniques avancées de génération",
        description: "Maîtrisez les techniques avancées pour des résultats professionnels",
        duration: 120
      },
      {
        title: "Optimisation et troubleshooting",
        description: "Optimisez les performances et résolvez les problèmes courants",
        duration: 90
      }
    ],
    testimonials: [
      {
        name: "Nicolas Fabre",
        role: "Développeur indépendant",
        content: "Formation très technique mais parfaitement expliquée. J'ai pu mettre en place mon propre système en quelques heures."
      },
      {
        name: "Amélie Bertrand",
        role: "Directrice artistique",
        content: "L'installation en local nous a permis de traiter des images confidentielles sans crainte. Un must pour notre agence."
      }
    ],
    moodleLink: "https://moodle.formations-digitales.fr/course/stable-diffusion-local",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
  }
];

export default formations;
