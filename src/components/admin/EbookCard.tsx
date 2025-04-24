
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Ebook = {
  id: string;
  titre: string;
  description: string | null;
  prix: number | null;
  categorie: string | null;
};

type EbookCardProps = {
  ebook: Ebook;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  isDeletePending: boolean;
  children?: React.ReactNode;
};

const EbookCard: React.FC<EbookCardProps> = ({
  ebook,
  isEditing,
  onEdit,
  onDelete,
  isDeletePending,
  children,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{ebook.titre}</CardTitle>
      <CardDescription>{ebook.categorie}</CardDescription>
    </CardHeader>
    {isEditing ? (
      children
    ) : (
      <CardContent className="space-y-2">
        {ebook.description && (
          <div>
            <p className="font-medium">Description:</p>
            <p className="text-gray-600">{ebook.description}</p>
          </div>
        )}
        {ebook.prix !== null && (
          <div>
            <p className="font-medium">Prix:</p>
            <p className="text-gray-600">{ebook.prix} €</p>
          </div>
        )}
      </CardContent>
    )}

    {!isEditing && (
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onEdit}>
          Modifier
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={isDeletePending}
        >
          {isDeletePending ? "Suppression..." : "Supprimer"}
        </Button>
      </CardFooter>
    )}
  </Card>
);

export default EbookCard;
