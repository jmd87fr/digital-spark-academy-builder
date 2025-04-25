
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

interface FooterContactSectionProps {
  content?: Content;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, id?: string) => void;
  isPending: boolean;
}

const FooterContactSection = ({ content, onSubmit, isPending }: FooterContactSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de contact</CardTitle>
        <CardDescription>Coordonnées affichées dans le pied de page</CardDescription>
      </CardHeader>
      <CardContent>
        {content ? (
          <form 
            id={`edit-footer-contact-form`} 
            onSubmit={(e) => onSubmit(e, content.id)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" defaultValue={content.email || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <Input name="phone" defaultValue={content.phone || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Adresse</label>
              <Textarea name="address" defaultValue={content.address || ""} />
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
            id="create-footer-contact-form" 
            onSubmit={(e) => onSubmit(e)}
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

export default FooterContactSection;
