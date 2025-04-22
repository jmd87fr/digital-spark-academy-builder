
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real implementation, this would connect to a newsletter service
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-brand-green/10 py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Abonnez-vous à notre newsletter</h2>
          <p className="text-lg text-gray-600 mb-6">
            Recevez nos dernières actualités, tutoriels et offres spéciales sur les IA génératives directement dans votre boîte mail.
          </p>

          {subscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Merci pour votre inscription !</h3>
              <p className="text-green-700">
                Vous recevrez bientôt notre prochain email avec du contenu exclusif sur l'IA.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-brand-magenta hover:bg-brand-magenta/90 whitespace-nowrap">
                S'abonner
              </Button>
            </form>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
