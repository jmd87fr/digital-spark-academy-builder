
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Newsletter from "@/components/home/Newsletter";
import formations from "@/data/formations";

// Types for our filters
type CategoryFilter = 'all' | 'chatgpt' | 'midjourney' | 'stable-diffusion' | 'dall-e' | 'autre';
type LevelFilter = 'all' | 'débutant' | 'intermédiaire' | 'avancé';
type DurationFilter = 'all' | 'court' | 'moyen' | 'long';

const Formations = () => {
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');

  // Apply filters to formations data
  const filteredFormations = formations.filter(formation => {
    // Category filter
    if (categoryFilter !== 'all' && formation.category !== categoryFilter) {
      return false;
    }
    
    // Level filter
    if (levelFilter !== 'all' && formation.level !== levelFilter) {
      return false;
    }
    
    // Duration filter (short: <= 6h, medium: <= 12h, long: > 12h)
    if (durationFilter !== 'all') {
      if (durationFilter === 'court' && formation.duration > 6) {
        return false;
      }
      if (durationFilter === 'moyen' && (formation.duration <= 6 || formation.duration > 12)) {
        return false;
      }
      if (durationFilter === 'long' && formation.duration <= 12) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-green/90 to-brand-blue/90 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Nos formations IA</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez notre catalogue de formations pour maîtriser les IA génératives et booster votre productivité et créativité.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div>
              <h2 className="text-lg font-semibold mb-2">Filtrer par catégorie :</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={categoryFilter === 'all' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('all')}
                >
                  Toutes
                </Button>
                <Button 
                  variant={categoryFilter === 'chatgpt' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('chatgpt')}
                >
                  ChatGPT
                </Button>
                <Button 
                  variant={categoryFilter === 'midjourney' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('midjourney')}
                >
                  Midjourney
                </Button>
                <Button 
                  variant={categoryFilter === 'stable-diffusion' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('stable-diffusion')}
                >
                  Stable Diffusion
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Niveau :</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={levelFilter === 'all' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLevelFilter('all')}
                >
                  Tous
                </Button>
                <Button 
                  variant={levelFilter === 'débutant' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLevelFilter('débutant')}
                >
                  Débutant
                </Button>
                <Button 
                  variant={levelFilter === 'intermédiaire' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLevelFilter('intermédiaire')}
                >
                  Intermédiaire
                </Button>
                <Button 
                  variant={levelFilter === 'avancé' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLevelFilter('avancé')}
                >
                  Avancé
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Durée :</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={durationFilter === 'all' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setDurationFilter('all')}
                >
                  Toutes
                </Button>
                <Button 
                  variant={durationFilter === 'court' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setDurationFilter('court')}
                >
                  Court (&lt; 6h)
                </Button>
                <Button 
                  variant={durationFilter === 'moyen' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setDurationFilter('moyen')}
                >
                  Moyen (6-12h)
                </Button>
                <Button 
                  variant={durationFilter === 'long' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setDurationFilter('long')}
                >
                  Long (&gt; 12h)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations List */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFormations.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-4">Aucune formation ne correspond à vos critères</h3>
              <p className="text-gray-600 mb-6">Essayez de modifier vos filtres pour voir plus de résultats.</p>
              <Button onClick={() => {
                setCategoryFilter('all');
                setLevelFilter('all');
                setDurationFilter('all');
              }}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFormations.map((formation) => (
                <Card key={formation.id} className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-video relative">
                    <img
                      src={formation.imageUrl}
                      alt={formation.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium">
                        {formation.level}
                      </span>
                      <span className="font-bold text-lg">{formation.price} €</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{formation.shortDescription}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formation.duration}h</span>
                      </div>
                      <Button asChild className="bg-brand-magenta hover:bg-brand-magenta/90">
                        <Link to={`/formations/${formation.id}`}>Découvrir</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-green/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Nous développons régulièrement de nouvelles formations. Abonnez-vous à notre newsletter pour être informé des nouveautés.
          </p>
          <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90">
            <a href="#newsletter">S'abonner à la newsletter</a>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <div id="newsletter">
        <Newsletter />
      </div>
    </Layout>
  );
};

export default Formations;
