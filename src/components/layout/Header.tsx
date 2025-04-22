
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link to="/mon-compte" className="text-foreground hover:text-brand-magenta font-medium">
              Mon compte
            </Link>
            <Button asChild variant="default" className="bg-brand-magenta hover:bg-brand-magenta/90">
              <Link to="/formations">Découvrir nos formations</Link>
            </Button>
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

      {/* Mobile menu */}
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
            <Link
              to="/mon-compte"
              className="block text-foreground hover:text-brand-magenta font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Mon compte
            </Link>
            <Button
              asChild
              variant="default"
              className="w-full bg-brand-magenta hover:bg-brand-magenta/90"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/formations">Découvrir nos formations</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
