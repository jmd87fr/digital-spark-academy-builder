import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownEditor } from '@/components/ui/markdown-editor';

type Content = {
  id: string;
  section: string;
  title?: string | null;
  subtitle?: string | null;
  content?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  image_url?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  updated_at?: string | null;
};

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState<string>("accueil");
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .order("section");
      
      if (error) {
        if (error.code === "PGRST116") {
          // La table n'existe pas encore
          return [];
        }
        throw error;
      }
      
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<Content> }) => {
      const { data, error } = await supabase
        .from("contents")
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast.success('Contenu mis à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newContent: Omit<Content, 'id'>) => {
      const { data, error } = await supabase
        .from("contents")
        .insert(newContent)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast.success('Section créée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updates: Record<string, string> = {};
    formData.forEach((value, key) => {
      updates[key] = value.toString();
    });
    
    updateMutation.mutate({
      id,
      updates
    });
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>, section: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newContent: Record<string, string> = { section };
    formData.forEach((value, key) => {
      if (value) {
        newContent[key] = value.toString();
      }
    });
    
    createMutation.mutate(newContent as any);
  };

  const getContentBySection = (section: string) => {
    return contents?.filter(content => content.section.startsWith(section)) || [];
  };

  const homeContent = getContentBySection("home");
  const footerContent = getContentBySection("footer");
  const homeHeroContent = homeContent.find(content => content.section === "home.hero");
  const homeAboutContent = homeContent.find(content => content.section === "home.about");
  const footerContactContent = footerContent.find(content => content.section === "footer.contact");
  const footerLinksContent = footerContent.find(content => content.section === "footer.links");

  if (isLoading) {
    return <div>Chargement du contenu...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gérer le contenu du site</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="accueil">Page d'accueil</TabsTrigger>
          <TabsTrigger value="pied">Pied de page</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accueil" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Héro</CardTitle>
              <CardDescription>La première section visible sur la page d'accueil</CardDescription>
            </CardHeader>
            <CardContent>
              {homeHeroContent ? (
                <form 
                  id={`edit-home-hero-form`} 
                  onSubmit={(e) => handleUpdate(e, homeHeroContent.id)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="title" defaultValue={homeHeroContent.title || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Sous-titre</label>
                    <MarkdownEditor 
                      name="subtitle" 
                      defaultValue={homeHeroContent.subtitle || ""}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Texte du bouton</label>
                    <Input name="button_text" defaultValue={homeHeroContent.button_text || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Lien du bouton</label>
                    <Input name="button_link" defaultValue={homeHeroContent.button_link || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de l'image</label>
                    <Input name="image_url" defaultValue={homeHeroContent.image_url || ""} />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Sauvegarde..." : "Enregistrer"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form 
                  id="create-home-hero-form" 
                  onSubmit={(e) => handleCreate(e, "home.hero")}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="title" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Sous-titre</label>
                    <Textarea name="subtitle" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Texte du bouton</label>
                    <Input name="button_text" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Lien du bouton</label>
                    <Input name="button_link" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de l'image</label>
                    <Input name="image_url" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Création..." : "Créer"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Section À propos</CardTitle>
              <CardDescription>La section présentant l'entreprise</CardDescription>
            </CardHeader>
            <CardContent>
              {homeAboutContent ? (
                <form 
                  id={`edit-home-about-form`} 
                  onSubmit={(e) => handleUpdate(e, homeAboutContent.id)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="title" defaultValue={homeAboutContent.title || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Contenu</label>
                    <Textarea name="content" defaultValue={homeAboutContent.content || ""} rows={5} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de l'image</label>
                    <Input name="image_url" defaultValue={homeAboutContent.image_url || ""} />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Sauvegarde..." : "Enregistrer"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form 
                  id="create-home-about-form" 
                  onSubmit={(e) => handleCreate(e, "home.about")}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="title" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Contenu</label>
                    <Textarea name="content" rows={5} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de l'image</label>
                    <Input name="image_url" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Création..." : "Créer"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pied" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
              <CardDescription>Coordonnées affichées dans le pied de page</CardDescription>
            </CardHeader>
            <CardContent>
              {footerContactContent ? (
                <form 
                  id={`edit-footer-contact-form`} 
                  onSubmit={(e) => handleUpdate(e, footerContactContent.id)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input name="email" defaultValue={footerContactContent.email || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone</label>
                    <Input name="phone" defaultValue={footerContactContent.phone || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse</label>
                    <Textarea name="address" defaultValue={footerContactContent.address || ""} />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Sauvegarde..." : "Enregistrer"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form 
                  id="create-footer-contact-form" 
                  onSubmit={(e) => handleCreate(e, "footer.contact")}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input name="email" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone</label>
                    <Input name="phone" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse</label>
                    <Textarea name="address" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Création..." : "Créer"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Liens sociaux</CardTitle>
              <CardDescription>Liens vers les réseaux sociaux</CardDescription>
            </CardHeader>
            <CardContent>
              {footerLinksContent ? (
                <form 
                  id={`edit-footer-links-form`} 
                  onSubmit={(e) => handleUpdate(e, footerLinksContent.id)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <Input name="facebook" defaultValue={footerLinksContent.facebook || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <Input name="twitter" defaultValue={footerLinksContent.twitter || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <Input name="linkedin" defaultValue={footerLinksContent.linkedin || ""} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <Input name="instagram" defaultValue={footerLinksContent.instagram || ""} />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Sauvegarde..." : "Enregistrer"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form 
                  id="create-footer-links-form" 
                  onSubmit={(e) => handleCreate(e, "footer.links")}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <Input name="facebook" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <Input name="twitter" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <Input name="linkedin" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <Input name="instagram" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Création..." : "Créer"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
