
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EbookCreateFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isPending: boolean;
};

const EbookCreateForm: React.FC<EbookCreateFormProps> = ({
  onSubmit,
  onCancel,
  isPending,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Créer un nouvel e-book</CardTitle>
      <CardDescription>
        Remplissez les détails du nouvel e-book
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form id="create-ebook-form" onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <Input name="titre" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea name="description" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie</label>
          <Input name="categorie" placeholder="ebook, audiobook" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prix</label>
          <Input name="prix" type="number" step="0.01" defaultValue="0" />
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <Button form="create-ebook-form" type="submit" disabled={isPending}>
        {isPending ? "Création en cours..." : "Créer"}
      </Button>
      <Button variant="outline" onClick={onCancel}>Annuler</Button>
    </CardFooter>
  </Card>
);

export default EbookCreateForm;
