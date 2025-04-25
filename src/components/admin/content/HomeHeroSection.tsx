
import { Content } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from '@/components/ui/markdown-editor';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HomeHeroSectionProps {
  content?: Content;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, id?: string) => void;
  isPending: boolean;
}

const HomeHeroSection = ({ content, onSubmit, isPending }: HomeHeroSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Héro</CardTitle>
        <CardDescription>La première section visible sur la page d'accueil</CardDescription>
      </CardHeader>
      <CardContent>
        {content ? (
          <form 
            id={`edit-home-hero-form`} 
            onSubmit={(e) => onSubmit(e, content.id)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <Input name="title" defaultValue={content.title || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Sous-titre</label>
              <MarkdownEditor 
                name="subtitle" 
                defaultValue={content.subtitle || ""}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Texte du bouton</label>
              <Input name="button_text" defaultValue={content.button_text || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Lien du bouton</label>
              <Input name="button_link" defaultValue={content.button_link || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">URL de l'image</label>
              <Input name="image_url" defaultValue={content.image_url || ""} />
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Sauvegarde..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        ) : (
          <form 
            id="create-home-hero-form" 
            onSubmit={(e) => onSubmit(e)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <Input name="title" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Sous-titre</label>
              <MarkdownEditor name="subtitle" />
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
                disabled={isPending}
              >
                {isPending ? "Création..." : "Créer"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default HomeHeroSection;
