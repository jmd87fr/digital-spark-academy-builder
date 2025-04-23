
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminFormations from "@/components/admin/AdminFormations";
import AdminEbooks from "@/components/admin/AdminEbooks";
import AdminPolicies from "@/components/admin/AdminPolicies";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: isAdmin } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data.role === 'admin';
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (isAdmin === false) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Administration</h1>
        
        <Tabs defaultValue="formations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="ebooks">E-books</TabsTrigger>
            <TabsTrigger value="policies">Pages légales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="formations">
            <AdminFormations />
          </TabsContent>
          
          <TabsContent value="ebooks">
            <AdminEbooks />
          </TabsContent>
          
          <TabsContent value="policies">
            <AdminPolicies />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
