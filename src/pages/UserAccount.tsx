
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import formations from "@/data/formations";
import ebooks from "@/data/ebooks";
import { Link } from "react-router-dom";
import Newsletter from "@/components/home/Newsletter";

// Mock data for purchased products
const purchasedFormations = [formations[0], formations[1]];
const purchasedEbooks = [ebooks[0], ebooks[2]];

const UserAccount = () => {
  const [user, setUser] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78"
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setEditMode(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-magenta/80 to-brand-blue/80 text-white py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Mon compte</h1>
          <p className="text-xl mt-2">Gérez vos formations, e-books et paramètres</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="formations" className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="formations">Mes formations</TabsTrigger>
              <TabsTrigger value="ebooks">Mes e-books</TabsTrigger>
              <TabsTrigger value="profile">Mon profil</TabsTrigger>
            </TabsList>

            {/* Formations Tab */}
            <TabsContent value="formations">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Mes formations</h2>
                
                {purchasedFormations.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Vous n'avez pas encore de formations</h3>
                    <p className="text-gray-600 mb-6">Découvrez notre catalogue et commencez à apprendre dès aujourd'hui.</p>
                    <Button asChild>
                      <Link to="/formations">Découvrir nos formations</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {purchasedFormations.map((formation) => (
                      <div key={formation.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <img
                            src={formation.imageUrl}
                            alt={formation.title}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                          <p className="text-gray-600 mb-4">{formation.shortDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium">
                              {formation.level}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                              {formation.duration}h
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button asChild className="bg-brand-green hover:bg-brand-green/90">
                              <a href={formation.moodleLink} target="_blank" rel="noopener noreferrer">
                                Continuer la formation
                              </a>
                            </Button>
                            <Button asChild variant="outline">
                              <Link to={`/formations/${formation.id}`}>Détails de la formation</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">Envie d'apprendre davantage ?</p>
                  <Button asChild variant="outline">
                    <Link to="/formations">Voir toutes nos formations</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Ebooks Tab */}
            <TabsContent value="ebooks">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Mes e-books</h2>
                
                {purchasedEbooks.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Vous n'avez pas encore d'e-books</h3>
                    <p className="text-gray-600 mb-6">Découvrez notre collection et enrichissez vos connaissances.</p>
                    <Button asChild>
                      <Link to="/ebooks">Découvrir nos e-books</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {purchasedEbooks.map((ebook) => (
                      <div key={ebook.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <div className="flex gap-4">
                          <div className="w-1/3">
                            <img
                              src={ebook.coverImage}
                              alt={ebook.title}
                              className="w-full h-auto rounded-lg shadow-sm"
                            />
                          </div>
                          <div className="w-2/3">
                            <h3 className="text-lg font-bold mb-2">{ebook.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                              {ebook.formats.map((format) => (
                                <span 
                                  key={format}
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    format === 'ebook' 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-purple-100 text-purple-700'
                                  }`}
                                >
                                  {format === 'ebook' ? 'Ebook' : 'Audiobook'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          {ebook.formats.includes('ebook') && (
                            <Button asChild variant="outline" className="flex-1">
                              <a href={ebook.downloadUrl} target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                PDF
                              </a>
                            </Button>
                          )}
                          {ebook.formats.includes('audiobook') && (
                            <Button asChild variant="outline" className="flex-1">
                              <a href={ebook.downloadUrl} target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                                </svg>
                                Audio
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">Envie d'en savoir plus ?</p>
                  <Button asChild variant="outline">
                    <Link to="/ebooks">Voir tous nos e-books</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Mon profil</CardTitle>
                    <CardDescription>
                      Gérez vos informations personnelles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid gap-6">
                        {editMode ? (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom</Label>
                                <Input 
                                  id="firstName" 
                                  name="firstName" 
                                  value={formData.firstName} 
                                  onChange={handleInputChange} 
                                  required 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Nom</Label>
                                <Input 
                                  id="lastName" 
                                  name="lastName" 
                                  value={formData.lastName} 
                                  onChange={handleInputChange} 
                                  required 
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                required 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Téléphone</Label>
                              <Input 
                                id="phone" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleInputChange} 
                              />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                                Annuler
                              </Button>
                              <Button type="submit" className="bg-brand-green hover:bg-brand-green/90">
                                Enregistrer
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Prénom</h3>
                                <p className="mt-1">{user.firstName}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                                <p className="mt-1">{user.lastName}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Email</h3>
                              <p className="mt-1">{user.email}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                              <p className="mt-1">{user.phone}</p>
                            </div>
                            <div className="flex justify-end mt-4">
                              <Button onClick={() => setEditMode(true)}>
                                Modifier
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sécurité</CardTitle>
                      <CardDescription>
                        Gérez vos paramètres de sécurité
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Modifier votre mot de passe</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Mettez à jour votre mot de passe pour sécuriser votre compte
                            </p>
                          </div>
                          <Button variant="outline">Modifier</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Authentification à deux facteurs</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Ajoutez une couche de sécurité supplémentaire à votre compte
                            </p>
                          </div>
                          <Button variant="outline">Activer</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </Layout>
  );
};

export default UserAccount;
