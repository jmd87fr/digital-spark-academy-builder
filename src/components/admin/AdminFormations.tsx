
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

const AdminFormations = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: formations, isLoading } = useQuery({
    queryKey: ['formations-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('formations')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newFormation: any) => {
      const { data, error } = await supabase
        .from('formations')
        .insert(newFormation)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations-admin'] });
      setIsCreating(false);
      toast.success('Formation créée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: any }) => {
      const { data, error } = await supabase
        .from('formations')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations-admin'] });
      setEditingId(null);
      toast.success('Formation mise à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('formations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations-admin'] });
      toast.success('Formation supprimée');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createMutation.mutate({
      titre: formData.get('titre'),
      description: formData.get('description'),
      theme: formData.get('theme'),
      image_url: formData.get('image_url'),
      objectif: formData.get('objectif'),
      public_cible: formData.get('public_cible'),
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateMutation.mutate({
      id,
      updates: {
        titre: formData.get('titre'),
        description: formData.get('description'),
        theme: formData.get('theme'),
        image_url: formData.get('image_url'),
        objectif: formData.get('objectif'),
        public_cible: formData.get('public_cible'),
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Chargement des formations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gérer les formations</h2>
        <Button onClick={() => setIsCreating(true)} variant="default">
          Nouvelle formation
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle formation</CardTitle>
            <CardDescription>Remplissez les détails de la nouvelle formation</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="create-form" onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <Input name="titre" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea name="description" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Thème</label>
                <Input name="theme" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL de l'image</label>
                <Input name="image_url" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Objectifs</label>
                <Textarea name="objectif" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Public cible</label>
                <Textarea name="public_cible" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button form="create-form" type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Création en cours..." : "Créer"}
            </Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Annuler
            </Button>
          </CardFooter>
        </Card>
      )}

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
                  id={`edit-form-${formation.id}`}
                  onSubmit={(e) => handleUpdate(e, formation.id)}
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

                  <div>
                    <label className="block text-sm font-medium mb-1">Objectifs</label>
                    <Textarea name="objectif" defaultValue={formation.objectif || ''} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Public cible</label>
                    <Textarea name="public_cible" defaultValue={formation.public_cible || ''} />
                  </div>
                </form>
              </CardContent>
            ) : (
              <CardContent className="space-y-2">
                {formation.description && (
                  <div>
                    <p className="font-medium">Description:</p>
                    <p className="text-gray-600">{formation.description}</p>
                  </div>
                )}
                {formation.objectif && (
                  <div>
                    <p className="font-medium">Objectifs:</p>
                    <p className="text-gray-600">{formation.objectif}</p>
                  </div>
                )}
                {formation.public_cible && (
                  <div>
                    <p className="font-medium">Public cible:</p>
                    <p className="text-gray-600">{formation.public_cible}</p>
                  </div>
                )}
              </CardContent>
            )}
            
            <CardFooter className="flex justify-end gap-2">
              {editingId === formation.id ? (
                <>
                  <Button 
                    form={`edit-form-${formation.id}`} 
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
                  <Button variant="outline" onClick={() => setEditingId(formation.id)}>
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(formation.id)}
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

export default AdminFormations;
