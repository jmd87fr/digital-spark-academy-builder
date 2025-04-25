
import { Content } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FooterSocialSectionProps {
  content?: Content;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, id?: string) => void;
  isPending: boolean;
}

const FooterSocialSection = ({ content, onSubmit, isPending }: FooterSocialSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liens sociaux</CardTitle>
        <CardDescription>Liens vers les réseaux sociaux</CardDescription>
      </CardHeader>
      <CardContent>
        {content ? (
          <form 
            id={`edit-footer-links-form`} 
            onSubmit={(e) => onSubmit(e, content.id)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <Input name="facebook" defaultValue={content.facebook || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Twitter</label>
              <Input name="twitter" defaultValue={content.twitter || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <Input name="linkedin" defaultValue={content.linkedin || ""} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Instagram</label>
              <Input name="instagram" defaultValue={content.instagram || ""} />
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
            id="create-footer-links-form" 
            onSubmit={(e) => onSubmit(e)}
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

export default FooterSocialSection;
