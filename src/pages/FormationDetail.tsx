import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import formations from "@/data/formations";
import Newsletter from "@/components/home/Newsletter";
import { useNavigate } from "react-router-dom";

const FormationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  // Find the formation by ID
  const formation = formations.find(f => f.id === id);
  
  // If formation not found, redirect to formations page
  if (!formation) {
    navigate("/formations");
    return null;
  }

  // Mock payment function (would connect to Stripe/Paypal in a real implementation)
  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setShowPaymentSuccess(true);
    }, 1000);
  };

  return (
    <Layout>
      {showPaymentSuccess ? (
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">Paiement réussi !</h2>
            <p className="text-lg text-green-700 mb-6">
              Vous allez recevoir un email avec les instructions pour accéder à votre formation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-brand-green hover:bg-brand-green/90">
                <a href={formation.moodleLink} target="_blank" rel="noopener noreferrer">
                  Accéder à la formation
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/mon-compte">Voir mes formations</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-brand-green/90 to-brand-blue/90 text-white py-16">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <Link to="/formations" className="text-white/90 hover:text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                      Retour aux formations
                    </Link>
                    <span className="text-white/60">•</span>
                    <span className="text-white/90 capitalize">{formation.category}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{formation.title}</h1>
                  <p className="text-xl mb-6">{formation.shortDescription}</p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                      <span>Niveau {formation.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formation.duration} heures de formation</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                          </svg>
                          Voir le teaser
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Aperçu: {formation.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video mt-4">
                          <iframe
                            src={formation.videoTeaserUrl}
                            title={`Teaser: ${formation.title}`}
                            allowFullScreen
                            className="w-full h-full rounded-md"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button className="bg-white text-brand-green hover:bg-white/90" onClick={handlePayment}>
                      S'inscrire pour {formation.price} €
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={formation.imageUrl}
                      alt={formation.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-12">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start mb-8 border-b pb-px rounded-none">
                  <TabsTrigger value="details" className="rounded-t-lg rounded-b-none">Détails de la formation</TabsTrigger>
                  <TabsTrigger value="programme" className="rounded-t-lg rounded-b-none">Programme</TabsTrigger>
                  <TabsTrigger value="temoignages" className="rounded-t-lg rounded-b-none">Témoignages</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <h2 className="text-2xl font-bold mb-4">À propos de cette formation</h2>
                      <p className="text-gray-700 mb-6">{formation.longDescription}</p>

                      <h3 className="text-xl font-bold mb-3">Objectifs d'apprentissage</h3>
                      <ul className="space-y-2 mb-6">
                        {formation.learningObjectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-green mr-2 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xl font-bold mb-3">Prérequis</h3>
                      <ul className="space-y-2 mb-6">
                        {formation.prerequisites.map((prerequisite, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-blue mr-2 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>{prerequisite}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Informations clés</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 mr-3 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <span className="block font-medium">Durée totale</span>
                              <span className="text-gray-600">{formation.duration} heures</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 mr-3 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                            <div>
                              <span className="block font-medium">Niveau</span>
                              <span className="text-gray-600 capitalize">{formation.level}</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 mr-3 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                            </svg>
                            <div>
                              <span className="block font-medium">Catégorie</span>
                              <span className="text-gray-600 capitalize">{formation.category}</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 mr-3 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <span className="block font-medium">Prix</span>
                              <span className="text-gray-600">{formation.price} €</span>
                            </div>
                          </li>
                        </ul>

                        <div className="mt-8">
                          <Button className="w-full bg-brand-magenta hover:bg-brand-magenta/90" onClick={handlePayment}>
                            S'inscrire maintenant
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="programme" className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">Programme de la formation</h2>
                  <div className="space-y-4">
                    {formation.modules.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                            <p className="text-gray-600 mb-2">{module.description}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{module.duration} minutes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button className="bg-brand-magenta hover:bg-brand-magenta/90" onClick={handlePayment}>
                      S'inscrire pour {formation.price} €
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="temoignages" className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">Ce que disent nos apprenants</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {formation.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-brand-magenta/10 rounded-full flex items-center justify-center text-brand-magenta font-bold">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500 mb-3">{testimonial.role}</p>
                            <p className="text-gray-600 italic">"{testimonial.content}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Other Formations */}
          <section className="py-12 bg-gray-50">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Formations similaires</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {formations
                  .filter(f => f.id !== formation.id)
                  .slice(0, 3)
                  .map(f => (
                    <div key={f.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-gray-600 mb-4">{f.shortDescription}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{f.price} €</span>
                        <Button asChild variant="outline">
                          <Link to={`/formations/${f.id}`}>En savoir plus</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-brand-magenta to-brand-blue text-white">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Prêt à booster vos compétences ?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Inscrivez-vous maintenant et commencez à apprendre dès aujourd'hui.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-brand-magenta hover:bg-white/90"
                onClick={handlePayment}
              >
                S'inscrire pour {formation.price} €
              </Button>
            </div>
          </section>
        </>
      )}

      <Newsletter />
    </Layout>
  );
};

export default FormationDetail;
