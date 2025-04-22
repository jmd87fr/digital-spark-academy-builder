
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isResetPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/auth',
        });
        if (error) throw error;
        toast.success("Un email de réinitialisation a été envoyé");
        setIsResetPassword(false);
      } else if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, firstName, lastName);
      }
      if (!isResetPassword) {
        navigate('/');
        toast.success(isLogin ? "Connexion réussie" : "Inscription réussie");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {isResetPassword 
                ? "Réinitialisation du mot de passe"
                : isLogin 
                ? "Connexion" 
                : "Inscription"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isResetPassword
                ? "Entrez votre email pour recevoir un lien de réinitialisation"
                : isLogin
                ? "Connectez-vous pour accéder à vos formations"
                : "Créez votre compte pour commencer"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {!isLogin && !isResetPassword && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={!isLogin && !isResetPassword}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={!isLogin && !isResetPassword}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isResetPassword && (
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!isResetPassword}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Chargement..."
                : isResetPassword
                ? "Envoyer le lien"
                : isLogin
                ? "Se connecter"
                : "S'inscrire"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            {isLogin && !isResetPassword && (
              <button
                type="button"
                onClick={() => setIsResetPassword(true)}
                className="text-sm text-brand-magenta hover:underline block w-full"
              >
                Mot de passe oublié ?
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setIsResetPassword(false);
              }}
              className="text-sm text-brand-magenta hover:underline"
            >
              {isResetPassword
                ? "Retour à la connexion"
                : isLogin
                ? "Pas encore de compte ? S'inscrire"
                : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
