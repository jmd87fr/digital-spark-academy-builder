
export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'travail' | 'maison' | 'vacances' | 'enfants';
  formats: ('ebook' | 'audiobook')[];
  coverImage: string;
  previewUrl: string;
  downloadUrl: string;
}

const ebooks: Ebook[] = [
  {
    id: "ia-travail",
    title: "L'IA et moi au travail",
    description: "Découvrez comment intégrer l'IA dans votre quotidien professionnel pour gagner en productivité et en créativité. Ce guide pratique vous propose 50 cas d'usage concrets pour tous les métiers.",
    price: 19.99,
    category: "travail",
    formats: ["ebook", "audiobook"],
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    previewUrl: "#preview",
    downloadUrl: "#download"
  },
  {
    id: "ia-maison",
    title: "L'IA et moi à la maison",
    description: "Transformez votre vie quotidienne grâce à l'IA : cuisine, organisation, loisirs, apprentissage... Ce guide vous montre comment utiliser l'intelligence artificielle pour simplifier et enrichir votre vie personnelle.",
    price: 17.99,
    category: "maison",
    formats: ["ebook"],
    coverImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    previewUrl: "#preview",
    downloadUrl: "#download"
  },
  {
    id: "ia-vacances",
    title: "L'IA et moi en vacances",
    description: "Planifiez des vacances parfaites grâce à l'IA : trouvez les meilleures destinations, organisez votre itinéraire, découvrez des endroits secrets, et gardez des souvenirs inoubliables avec les outils d'IA.",
    price: 15.99,
    category: "vacances",
    formats: ["ebook", "audiobook"],
    coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    previewUrl: "#preview",
    downloadUrl: "#download"
  },
  {
    id: "ia-enfants",
    title: "L'IA et moi pour mes enfants",
    description: "Guide pour parents et éducateurs: comment utiliser l'IA de façon éthique et productive avec les enfants. Découvrez des activités éducatives, créatives et ludiques adaptées à chaque âge.",
    price: 21.99,
    category: "enfants",
    formats: ["ebook", "audiobook"],
    coverImage: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    previewUrl: "#preview",
    downloadUrl: "#download"
  }
];

export default ebooks;
