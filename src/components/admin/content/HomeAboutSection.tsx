
import { Content } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HomeAboutSectionProps {
  content?: Content;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, id?: string) => void;
  isPending: boolean;
}

const HomeAboutSection = ({ content, onSubmit, isPending }: HomeAboutSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Section À propos</CardTitle>
        <CardDescription>La section présentant l'entreprise</CardDescription>
      </CardHeader>
      <CardContent>
        {content ? (
          <form 
            id={`edit-home-about-form`} 
            onSubmit={(e) => onSubmit(e, content.id)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <Input name="title" defaultValue={content.title || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contenu</label>
              <Textarea name="content" defaultValue={content.content || ""} rows={5} />
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
            id="create-home-about-form" 
            onSubmit={(e) => onSubmit(e)}
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

export default HomeAboutSection;
