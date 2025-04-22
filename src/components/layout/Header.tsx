
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const { data: isAdmin } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data?.role === 'admin';
    },
    enabled: !!user,
  });

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/ab1a1952-fb8d-4184-b6b2-3c8d271ecfa7.png" 
                alt="Formations-digitales.fr" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/formations" className="text-foreground hover:text-brand-magenta font-medium">
              Formations
            </Link>
            <Link to="/ebooks" className="text-foreground hover:text-brand-magenta font-medium">
              E-books
            </Link>
            {user ? (
              <>
                <Link to="/mon-compte" className="text-foreground hover:text-brand-magenta font-medium">
                  Mon compte
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-foreground hover:text-brand-magenta font-medium">
                    Administration
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button asChild variant="default" className="bg-brand-magenta hover:bg-brand-magenta/90">
                <Link to="/auth">Connexion</Link>
              </Button>
            )}
          </nav>
          <div className="md:hidden flex items-center">
            <button
              className="text-foreground p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container px-4 py-4 space-y-4">
            <Link
              to="/formations"
              className="block text-foreground hover:text-brand-magenta font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Formations
            </Link>
            <Link
              to="/ebooks"
              className="block text-foreground hover:text-brand-magenta font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              E-books
            </Link>
            {user ? (
              <>
                <Link
                  to="/mon-compte"
                  className="block text-foreground hover:text-brand-magenta font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon compte
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block text-foreground hover:text-brand-magenta font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Administration
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="default"
                className="w-full bg-brand-magenta hover:bg-brand-magenta/90"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth">Connexion</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
