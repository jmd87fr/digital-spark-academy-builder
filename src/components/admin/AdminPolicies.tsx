import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import ReactMarkdown from "react-markdown";

type Policy = {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

const AdminPolicies = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const { data: policies, isLoading } = useQuery<Policy[]>({
    queryKey: ['policies-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .order("title") as { data: Policy[] | null, error: any };
      if (error) throw error;
      return data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newPolicy: Omit<Policy, 'id' | 'created_at' | 'updated_at'>) => {
      console.log("Création d'une nouvelle politique:", newPolicy);
      const { data, error } = await supabase
        .from("policies")
        .insert(newPolicy)
        .select() as { data: Policy[] | null, error: any };
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies-admin'] });
      setIsCreating(false);
      toast.success('Page créée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<Policy> }) => {
      console.log("Mise à jour de la politique:", id, updates);
      const { data, error } = await supabase
        .from("policies")
        .update(updates)
        .eq('id', id)
        .select() as { data: Policy[] | null, error: any };
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies-admin'] });
      setEditingId(null);
      toast.success('Page mise à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("policies")
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies-admin'] });
      toast.success('Page supprimée');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    console.log("Formdata recueillie pour création:", {
      title: formData.get('title'),
      slug: formData.get('slug'),
      content: formData.get('content'),
    });

    createMutation.mutate({
      title: String(formData.get('title') || ''),
      slug: String(formData.get('slug') || ''),
      content: String(formData.get('content') || ''),
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    console.log("Formdata recueillie pour mise à jour:", {
      title: formData.get('title'),
      slug: formData.get('slug'),
      content: formData.get('content'),
    });

    updateMutation.mutate({
      id,
      updates: {
        title: String(formData.get('title') || ''),
        slug: String(formData.get('slug') || ''),
        content: String(formData.get('content') || ''),
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return;
    deleteMutation.mutate(id);
  };

  const policyTypes = [
    { name: "Audiobooks", slug: "audiobooks" },
    { name: "Politique de confidentialité", slug: "privacy-policy" },
    { name: "Charte IA", slug: "ai-charter" },
    { name: "Conditions Générales d'Utilisation", slug: "terms" },
    { name: "Conditions Générales de Vente", slug: "terms-of-sale" },
    { name: "Mentions Légales", slug: "legal" },
  ];

  if (isLoading) {
    return <div>Chargement des pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gérer les pages légales</h2>
        <Button onClick={() => setIsCreating(true)} variant="default">
          Nouvelle page
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle page</CardTitle>
            <CardDescription>Choisissez le type de page et remplissez son contenu</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="create-policy-form" onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type de page</label>
                <select
                  name="slug"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => {
                    const selectedPolicy = policyTypes.find(p => p.slug === e.target.value);
                    if (selectedPolicy) {
                      const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
                      if (titleInput) titleInput.value = selectedPolicy.name;
                    }
                  }}
                >
                  <option value="">Sélectionnez un type</option>
                  {policyTypes.map(type => (
                    <option key={type.slug} value={type.slug}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <Input name="title" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contenu (Markdown supporté)</label>
                <MarkdownEditor name="content" required />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button form="create-policy-form" type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Création en cours..." : "Créer"}
            </Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Annuler
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-6">
        {policies?.map((policy) => (
          <Card key={policy.id}>
            <CardHeader>
              <CardTitle>{policy.title}</CardTitle>
              <CardDescription>/{policy.slug}</CardDescription>
            </CardHeader>

            {editingId === policy.id ? (
              <CardContent>
                <form
                  id={`edit-policy-form-${policy.id}`}
                  onSubmit={(e) => handleUpdate(e, policy.id)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input name="title" defaultValue={policy.title} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input name="slug" defaultValue={policy.slug} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Contenu (Markdown supporté)</label>
                    <MarkdownEditor
                      name="content"
                      defaultValue={policy.content}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
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
                  </div>
                </form>
              </CardContent>
            ) : (
              <CardContent>
                <div className="prose max-w-none">
                  <div className="max-h-[200px] overflow-y-auto border p-4 rounded-md">
                    <ReactMarkdown>{policy.content || ""}</ReactMarkdown>
                  </div>
                </div>
              </CardContent>
            )}

            <CardFooter className="flex justify-end gap-2">
              {editingId === policy.id ? (
                null
              ) : (
                <>
                  <Button variant="outline" onClick={() => setEditingId(policy.id)}>
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(policy.id)}
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

export default AdminPolicies;
