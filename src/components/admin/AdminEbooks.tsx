
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define a type for the ebook data structure
type Ebook = {
  id: string;
  titre: string;
  description: string | null;
  prix: number | null;
  Categorie: string | null; // Updated to match the column name in Supabase
}

const AdminEbooks = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: ebooks, isLoading } = useQuery({
    queryKey: ['ebooks-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebook')
        .select('*');
      if (error) throw error;
      return data as Ebook[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newEbook: Partial<Ebook>) => {
      const { data, error } = await supabase
        .from('ebook')
        .insert(newEbook)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks-admin'] });
      setIsCreating(false);
      toast.success('E-book créé avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<Ebook> }) => {
      const { data, error } = await supabase
        .from('ebook')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks-admin'] });
      setEditingId(null);
      toast.success('E-book mis à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ebook')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks-admin'] });
      toast.success('E-book supprimé');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createMutation.mutate({
      titre: formData.get('titre') as string,
      description: formData.get('description') as string,
      Categorie: formData.get('categorie') as string, // Updated to match the column name
      prix: Number(formData.get('prix')),
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateMutation.mutate({
      id,
      updates: {
        titre: formData.get('titre') as string,
        description: formData.get('description') as string,
        Categorie: formData.get('categorie') as string, // Updated to match the column name
        prix: Number(formData.get('prix')),
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet e-book ?')) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Chargement des e-books...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gérer les e-books</h2>
        <Button onClick={() => setIsCreating(true)} variant="default">
          Nouvel e-book
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un nouvel e-book</CardTitle>
            <CardDescription>Remplissez les détails du nouvel e-book</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="create-ebook-form" onSubmit={handleCreate} className="space-y-4">
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
            <Button form="create-ebook-form" type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Création en cours..." : "Créer"}
            </Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Annuler
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-6">
        {ebooks?.map((ebook) => (
          <Card key={ebook.id}>
            <CardHeader>
              <CardTitle>{ebook.titre}</CardTitle>
              <CardDescription>{ebook.Categorie}</CardDescription>
            </CardHeader>
            
            {editingId === ebook.id ? (
              <CardContent>
                <form
                  id={`edit-ebook-form-${ebook.id}`}
                  onSubmit={(e) => handleUpdate(e, ebook.id)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="titre" defaultValue={ebook.titre || ''} required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea name="description" defaultValue={ebook.description || ''} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Catégorie</label>
                    <Input name="categorie" defaultValue={ebook.Categorie || ''} />
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
            
            <CardFooter className="flex justify-end gap-2">
              {editingId === ebook.id ? (
                <>
                  <Button 
                    form={`edit-ebook-form-${ebook.id}`} 
                    type="submit"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "Sauvegarde..." : "Enregistrer"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditingId(null)}
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setEditingId(ebook.id)}>
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(ebook.id)}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEbooks;
