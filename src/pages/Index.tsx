
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Newsletter from "@/components/home/Newsletter";
import formations from "@/data/formations";
import ebooks from "@/data/ebooks";

const Index = () => {
  // Featured courses (limit to 3)
  const featuredFormations = formations.slice(0, 3);
  // Featured ebooks (limit to 2)
  const featuredEbooks = ebooks.slice(0, 2);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-magenta/90 to-brand-blue/90 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Maîtrisez les IA génératives pour transformer votre futur
              </h1>
              <p className="text-xl mb-8">
                Des formations expertes et des ressources pratiques pour exploiter tout le potentiel de l'intelligence artificielle dans votre vie professionnelle et personnelle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-brand-magenta hover:bg-white/90">
                  <Link to="/formations">Découvrir nos formations</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  <Link to="/ebooks">Explorer nos e-books</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              {/* Placeholder for video - In a real implementation, this would be an actual video player */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80" 
                alt="IA generative" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,133.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir nos formations ?</h2>
            <p className="text-lg text-gray-600">
              Des ressources de qualité conçues par des experts pour vous faire progresser rapidement dans la maîtrise des IA génératives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise reconnue</h3>
              <p className="text-gray-600">
                Nos formateurs sont des experts reconnus dans le domaine de l'IA, avec une expérience pratique dans les secteurs les plus innovants.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Applications concrètes</h3>
              <p className="text-gray-600">
                Des cas d'usage réels et applicables immédiatement dans votre quotidien professionnel pour un retour sur investissement rapide.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-brand-magenta rounded-lg flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pédagogie innovante</h3>
              <p className="text-gray-600">
                Des formats d'apprentissage variés et interactifs pour une assimilation optimale, quel que soit votre style d'apprentissage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Formations */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold">Nos formations populaires</h2>
              <p className="text-lg text-gray-600 mt-2">
                Découvrez nos formations les plus plébiscitées
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/formations">Voir toutes les formations</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredFormations.map((formation) => (
              <Card key={formation.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={formation.imageUrl}
                    alt={formation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium">
                      {formation.level}
                    </span>
                    <span className="font-bold text-lg">{formation.price} €</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                  <p className="text-gray-600 mb-4">{formation.shortDescription}</p>
                  <Button asChild className="w-full bg-brand-magenta hover:bg-brand-magenta/90">
                    <Link to={`/formations/${formation.id}`}>Découvrir</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ebooks */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold">Nos e-books</h2>
              <p className="text-lg text-gray-600 mt-2">
                Des guides pratiques pour intégrer l'IA dans votre quotidien
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/ebooks">Voir tous les e-books</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredEbooks.map((ebook) => (
              <div key={ebook.id} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-full md:w-1/3">
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">{ebook.title}</h3>
                  <p className="text-gray-600 mb-4">{ebook.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-500">Formats disponibles:</span>
                    {ebook.formats.includes('ebook') && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Ebook</span>
                    )}
                    {ebook.formats.includes('audiobook') && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Audiobook</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{ebook.price} €</span>
                    <Button asChild>
                      <Link to={`/ebooks/${ebook.id}`}>Acheter</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos apprenants</h2>
            <p className="text-lg text-gray-600">
              Découvrez les retours d'expérience de ceux qui ont déjà suivi nos formations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green font-bold">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <p className="text-sm text-gray-500">Responsable marketing</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Cette formation a complètement changé ma façon de travailler. Je gagne un temps précieux chaque jour grâce aux techniques apprises."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue font-bold">
                  TD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Thomas Dubois</h4>
                  <p className="text-sm text-gray-500">Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Les astuces pour formuler des prompts efficaces valent à elles seules le prix de la formation. Indispensable pour tout professionnel !"
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-magenta/20 rounded-full flex items-center justify-center text-brand-magenta font-bold">
                  JL
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Julie Leroy</h4>
                  <p className="text-sm text-gray-500">Graphiste indépendante</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Cette formation m'a permis de proposer de nouveaux services à mes clients. Un excellent investissement pour mon activité."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-magenta text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre futur avec l'IA ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez des milliers d'apprenants et développez vos compétences en IA générative dès aujourd'hui.
          </p>
          <Button asChild size="lg" className="bg-white text-brand-magenta hover:bg-white/90">
            <Link to="/formations">Découvrir nos formations</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
