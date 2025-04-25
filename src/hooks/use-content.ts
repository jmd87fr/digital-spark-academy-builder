
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Content } from "@/types/content";
import { toast } from "sonner";

export const useContent = () => {
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .order("section");
      
      if (error) {
        if (error.code === "PGRST116") {
          return [];
        }
        throw error;
      }
      
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<Content> }) => {
      const { data, error } = await supabase
        .from("contents")
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast.success('Contenu mis à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newContent: Omit<Content, 'id'>) => {
      const { data, error } = await supabase
        .from("contents")
        .insert(newContent)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast.success('Section créée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur: ' + error.message);
    }
  });

  return {
    contents,
    isLoading,
    updateMutation,
    createMutation
  };
};
