
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContent } from "@/hooks/use-content";
import HomeHeroSection from "./content/HomeHeroSection";
import HomeAboutSection from "./content/HomeAboutSection";
import FooterContactSection from "./content/FooterContactSection";
import FooterSocialSection from "./content/FooterSocialSection";

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState<string>("accueil");
  const { contents, isLoading, updateMutation, createMutation } = useContent();

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
          <HomeHeroSection
            content={homeHeroContent}
            onSubmit={(e, id) => id ? handleUpdate(e, id) : handleCreate(e, "home.hero")}
            isPending={updateMutation.isPending || createMutation.isPending}
          />
          
          <HomeAboutSection
            content={homeAboutContent}
            onSubmit={(e, id) => id ? handleUpdate(e, id) : handleCreate(e, "home.about")}
            isPending={updateMutation.isPending || createMutation.isPending}
          />
        </TabsContent>
        
        <TabsContent value="pied" className="space-y-6 mt-4">
          <FooterContactSection
            content={footerContactContent}
            onSubmit={(e, id) => id ? handleUpdate(e, id) : handleCreate(e, "footer.contact")}
            isPending={updateMutation.isPending || createMutation.isPending}
          />
          
          <FooterSocialSection
            content={footerLinksContent}
            onSubmit={(e, id) => id ? handleUpdate(e, id) : handleCreate(e, "footer.links")}
            isPending={updateMutation.isPending || createMutation.isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
