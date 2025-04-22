
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Newsletter from "@/components/home/Newsletter";
import ebooks from "@/data/ebooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

// Types for our filters
type CategoryFilter = 'all' | 'travail' | 'maison' | 'vacances' | 'enfants';
type FormatFilter = 'all' | 'ebook' | 'audiobook';

const Ebooks = () => {
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('all');
  const [selectedEbook, setSelectedEbook] = useState<string | null>(null);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  // Apply filters to ebooks data
  const filteredEbooks = ebooks.filter(ebook => {
    // Category filter
    if (categoryFilter !== 'all' && ebook.category !== categoryFilter) {
      return false;
    }
    
    // Format filter
    if (formatFilter !== 'all') {
      if (!ebook.formats.includes(formatFilter as 'ebook' | 'audiobook')) {
        return false;
      }
    }
    
    return true;
  });

  // Get the selected ebook for the modal
  const getSelectedEbookData = () => {
    return ebooks.find(ebook => ebook.id === selectedEbook);
  };

  // Handle purchase
  const handlePurchase = () => {
    // Simulate payment process
    setTimeout(() => {
      setPurchaseComplete(true);
    }, 1000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-yellow/90 to-brand-gold/90 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Nos e-books</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Des guides pratiques pour intégrer l'IA dans votre quotidien, disponibles en format numérique et audio.
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
                  variant={categoryFilter === 'travail' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('travail')}
                >
                  Au travail
                </Button>
                <Button 
                  variant={categoryFilter === 'maison' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('maison')}
                >
                  À la maison
                </Button>
                <Button 
                  variant={categoryFilter === 'vacances' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('vacances')}
                >
                  En vacances
                </Button>
                <Button 
                  variant={categoryFilter === 'enfants' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter('enfants')}
                >
                  Pour mes enfants
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Format :</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={formatFilter === 'all' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFormatFilter('all')}
                >
                  Tous
                </Button>
                <Button 
                  variant={formatFilter === 'ebook' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFormatFilter('ebook')}
                >
                  E-book
                </Button>
                <Button 
                  variant={formatFilter === 'audiobook' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFormatFilter('audiobook')}
                >
                  Audiobook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ebooks List */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEbooks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-4">Aucun e-book ne correspond à vos critères</h3>
              <p className="text-gray-600 mb-6">Essayez de modifier vos filtres pour voir plus de résultats.</p>
              <Button onClick={() => {
                setCategoryFilter('all');
                setFormatFilter('all');
              }}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredEbooks.map((ebook) => (
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
                      <div className="flex gap-2">
                        <Button 
                          asChild 
                          variant="outline"
                          onClick={() => {
                            window.open(ebook.previewUrl, '_blank');
                          }}
                        >
                          <a href={ebook.previewUrl} target="_blank" rel="noopener noreferrer">
                            Aperçu
                          </a>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="bg-brand-magenta hover:bg-brand-magenta/90"
                              onClick={() => setSelectedEbook(ebook.id)}
                            >
                              Acheter
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Acheter {ebook.title}</DialogTitle>
                            </DialogHeader>
                            {purchaseComplete ? (
                              <div className="text-center py-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <h3 className="text-xl font-bold text-green-800 mb-2">Achat réussi !</h3>
                                <p className="text-gray-600 mb-4">
                                  Votre e-book est prêt à être téléchargé.
                                </p>
                                <div className="flex flex-col gap-2">
                                  <Button asChild className="bg-brand-green hover:bg-brand-green/90 w-full">
                                    <a href={getSelectedEbookData()?.downloadUrl || "#"} target="_blank" rel="noopener noreferrer">
                                      Télécharger
                                    </a>
                                  </Button>
                                  <DialogClose asChild>
                                    <Button variant="outline" className="w-full" onClick={() => {
                                      setPurchaseComplete(false);
                                      setSelectedEbook(null);
                                    }}>
                                      Fermer
                                    </Button>
                                  </DialogClose>
                                </div>
                              </div>
                            ) : (
                              <div className="grid gap-4 py-4">
                                <div className="flex gap-4 items-center">
                                  <img 
                                    src={getSelectedEbookData()?.coverImage} 
                                    alt={getSelectedEbookData()?.title} 
                                    className="w-20 h-auto rounded" 
                                  />
                                  <div>
                                    <h3 className="font-semibold">{getSelectedEbookData()?.title}</h3>
                                    <p className="text-sm text-gray-500">
                                      Formats: {getSelectedEbookData()?.formats.join(', ')}
                                    </p>
                                    <p className="font-bold mt-1">{getSelectedEbookData()?.price} €</p>
                                  </div>
                                </div>
                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Sélectionnez votre mode de paiement :</h4>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center border rounded p-2">
                                      <input type="radio" id="card" name="payment" checked className="mr-2" />
                                      <label htmlFor="card" className="flex-grow">Carte bancaire</label>
                                      <div className="flex gap-1">
                                        <div className="w-8 h-5 bg-blue-100 rounded"></div>
                                        <div className="w-8 h-5 bg-red-100 rounded"></div>
                                      </div>
                                    </div>
                                    <div className="flex items-center border rounded p-2">
                                      <input type="radio" id="paypal" name="payment" className="mr-2" />
                                      <label htmlFor="paypal" className="flex-grow">PayPal</label>
                                      <div className="w-8 h-5 bg-blue-500 rounded"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-2">
                                  <DialogClose asChild>
                                    <Button variant="outline">Annuler</Button>
                                  </DialogClose>
                                  <Button onClick={handlePurchase}>
                                    Payer maintenant
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue/10 to-brand-green/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Pack complet "L'IA et moi"</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Obtenez les 4 e-books de notre collection "L'IA et moi" à un prix avantageux. Apprenez à utiliser l'IA dans tous les aspects de votre vie quotidienne.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-green mr-2 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>L'IA et moi au travail</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-green mr-2 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>L'IA et moi à la maison</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-green mr-2 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>L'IA et moi en vacances</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-green mr-2 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>L'IA et moi pour mes enfants</span>
                  </li>
                </ul>
                <div className="flex items-end gap-4 mb-6">
                  <div>
                    <span className="text-gray-500 line-through text-lg">75,96 €</span>
                    <div className="text-3xl font-bold text-brand-magenta">59,99 €</div>
                  </div>
                  <span className="px-3 py-1 bg-brand-magenta/10 text-brand-magenta rounded-full text-sm font-medium">
                    Économisez 21%
                  </span>
                </div>
                <Button size="lg" className="bg-brand-magenta hover:bg-brand-magenta/90">
                  Acheter le pack
                </Button>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    {ebooks.slice(0, 4).map((ebook, index) => (
                      <img 
                        key={ebook.id}
                        src={ebook.coverImage} 
                        alt={ebook.title}
                        className={`w-32 h-auto rounded-md shadow-lg transform ${
                          index === 0 ? 'rotate-[-5deg]' : 
                          index === 1 ? 'rotate-[5deg]' : 
                          index === 2 ? 'rotate-[5deg]' : 
                          'rotate-[-5deg]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </Layout>
  );
};

export default Ebooks;
