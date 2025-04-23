
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Policy = {
  id: string;
  title: string;
  slug: string;
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Correction du bug d'appel policies (retirer @ts-expect-error)
  const { data: policies } = useQuery<Policy[]>({
    queryKey: ['footer-policies'],
    queryFn: async () => {
      // Important: on ne ramène que les policies, pas les liens
      const { data, error } = await supabase
        .from("policies")
        .select("id, title, slug")
        .order("title", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/lovable-uploads/ab1a1952-fb8d-4184-b6b2-3c8d271ecfa7.png"
                alt="Formations-digitales.fr"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              Expert en formations sur les IA génératives. Nous vous aidons à maîtriser les technologies d'intelligence artificielle pour booster votre carrière et vos projets.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Email:</strong> contact@formations-digitales.fr
              </p>
              <p className="text-gray-300">
                <strong>Téléphone:</strong> +33 (0)1 23 45 67 89
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/formations" className="text-gray-300 hover:text-white">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/ebooks" className="text-gray-300 hover:text-white">
                  E-books
                </Link>
              </li>
              <li>
                <Link to="/audiobooks" className="text-gray-300 hover:text-white">
                  Audiobooks
                </Link>
              </li>
              <li>
                <Link to="/mon-compte" className="text-gray-300 hover:text-white">
                  Mon compte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            {subscribed ? (
              <p className="text-gray-300">
                Merci pour votre inscription ! Vous recevrez bientôt nos dernières actualités.
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <p className="text-gray-300 mb-3">
                  Inscrivez-vous pour recevoir nos actualités et des contenus exclusifs sur l&apos;IA.
                </p>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    className="bg-white/10 border-white/20 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-brand-magenta hover:bg-brand-magenta/90"
                  >
                    S&apos;inscrire
                  </Button>
                </div>
              </form>
            )}

            {/* Policy Links */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">Informations légales</h3>
              <ul className="space-y-2">
                {policies?.map((policy) => (
                  <li key={policy.slug}>
                    <Link to={`/${policy.slug}`} className="text-gray-300 hover:text-white">
                      {policy.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Formations-digitales.fr. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
