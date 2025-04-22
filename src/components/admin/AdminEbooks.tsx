
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

const AdminEbooks = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { data: ebooks, refetch } = useQuery({
    queryKey: ['ebooks-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebook')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const handleUpdate = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('ebook')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      await refetch();
      setEditingId(null);
      toast.success('E-book mis à jour');
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet e-book ?')) return;
    
    try {
      const { error } = await supabase
        .from('ebook')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await refetch();
      toast.success('E-book supprimé');
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gérer les e-books</h2>
        <Button variant="outline" onClick={() => setEditingId(null)}>
          Nouvel e-book
        </Button>
      </div>

      <div className="grid gap-6">
        {ebooks?.map((ebook) => (
          <Card key={ebook.id}>
            <CardHeader>
              <CardTitle>{ebook.titre}</CardTitle>
              <CardDescription>{ebook.catégorie}</CardDescription>
            </CardHeader>
            
            {editingId === ebook.id ? (
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleUpdate(ebook.id, {
                      titre: formData.get('titre'),
                      description: formData.get('description'),
                      catégorie: formData.get('catégorie'),
                      prix: Number(formData.get('prix')),
                    });
                  }}
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
                    <Input name="catégorie" defaultValue={ebook.catégorie || ''} />
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
                  
                  <div className="flex gap-2">
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            ) : (
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingId(ebook.id)}>
                  Modifier
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(ebook.id)}>
                  Supprimer
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEbooks;
