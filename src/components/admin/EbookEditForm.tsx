
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Ebook = {
  id: string;
  titre: string;
  description: string | null;
  prix: number | null;
  Categorie: string | null;
};

type EbookEditFormProps = {
  ebook: Ebook;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  onCancel: () => void;
  isPending: boolean;
};

const EbookEditForm: React.FC<EbookEditFormProps> = ({
  ebook,
  onSubmit,
  onCancel,
  isPending,
}) => {
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, ebook.id);
  };

  return (
    <>
      <CardContent>
        <form
          id={`edit-ebook-form-${ebook.id}`}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <Input name="titre" defaultValue={ebook.titre || ""} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea name="description" defaultValue={ebook.description || ""} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <Input name="Categorie" defaultValue={ebook.Categorie || ""} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prix</label>
            <Input
              name="prix"
              type="number"
              step="0.01"
              defaultValue={ebook.prix || 0}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          form={`edit-ebook-form-${ebook.id}`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sauvegarde..." : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </CardFooter>
    </>
  );
};

export default EbookEditForm;
