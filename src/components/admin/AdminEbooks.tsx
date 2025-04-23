import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EbookCreateForm from "./EbookCreateForm";
import EbookEditForm from "./EbookEditForm";
import EbookCard from "./EbookCard";
import { Button } from "@/components/ui/button";

type Ebook = {
  id: string;
  titre: string;
  description: string | null;
  prix: number | null;
  Categorie: string | null;
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
      Categorie: formData.get('categorie') as string,
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
        Categorie: formData.get('categorie') as string,
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
        <EbookCreateForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
          isPending={createMutation.isPending}
        />
      )}

      <div className="grid gap-6">
        {ebooks?.map((ebook) => {
          const isEditing = editingId === ebook.id;
          return (
            <EbookCard
              key={ebook.id}
              ebook={ebook}
              isEditing={isEditing}
              onEdit={() => setEditingId(ebook.id)}
              onDelete={() => handleDelete(ebook.id)}
              isDeletePending={deleteMutation.isPending}
            >
              {isEditing && (
                <EbookEditForm
                  ebook={ebook}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingId(null)}
                  isPending={updateMutation.isPending}
                />
              )}
            </EbookCard>
          );
        })}
      </div>
    </div>
  );
};

export default AdminEbooks;
