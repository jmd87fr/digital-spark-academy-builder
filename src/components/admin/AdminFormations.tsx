
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

const AdminFormations = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { data: formations, refetch } = useQuery({
    queryKey: ['formations-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('formations')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const handleUpdate = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('formations')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      await refetch();
      setEditingId(null);
      toast.success('Formation mise à jour');
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;
    
    try {
      const { error } = await supabase
        .from('formations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await refetch();
      toast.success('Formation supprimée');
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gérer les formations</h2>
        <Button variant="outline" onClick={() => setEditingId(null)}>
          Nouvelle formation
        </Button>
      </div>

      <div className="grid gap-6">
        {formations?.map((formation) => (
          <Card key={formation.id}>
            <CardHeader>
              <CardTitle>{formation.titre}</CardTitle>
              <CardDescription>{formation.theme}</CardDescription>
            </CardHeader>
            
            {editingId === formation.id ? (
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleUpdate(formation.id, {
                      titre: formData.get('titre'),
                      description: formData.get('description'),
                      theme: formData.get('theme'),
                      image_url: formData.get('image_url'),
                    });
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="titre" defaultValue={formation.titre} required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea name="description" defaultValue={formation.description || ''} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Thème</label>
                    <Input name="theme" defaultValue={formation.theme || ''} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de l'image</label>
                    <Input name="image_url" defaultValue={formation.image_url || ''} />
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
                <Button variant="outline" onClick={() => setEditingId(formation.id)}>
                  Modifier
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(formation.id)}>
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

export default AdminFormations;
