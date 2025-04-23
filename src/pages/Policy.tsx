
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";

type Policy = {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

const Policy = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: policy, isLoading, error } = useQuery<Policy | null>({
    queryKey: ['policy', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .eq("slug", slug)
        .maybeSingle() as { data: Policy | null, error: any };
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-8">
            <p>Chargement...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-red-600">Page introuvable</h1>
            <p className="mt-4">La page que vous cherchez n&apos;existe pas.</p>
          </div>
        ) : policy ? (
          <div>
            <h1 className="text-3xl font-bold mb-8">{policy.title}</h1>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: policy.content?.replace(/\n/g, '<br>') || "" }} />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold">Page introuvable</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Policy;
