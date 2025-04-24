
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookiePreferences | null>(null);

  // Préférences par défaut
  const defaultPreferences: CookiePreferences = {
    necessary: true, // Toujours activé
    functional: false,
    analytics: false,
    marketing: false,
  };

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent) {
      setCookieConsent(JSON.parse(savedConsent));
    } else {
      // Montrer la bannière si aucun consentement n'a été donné
      setOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleSavePreferences = () => {
    saveConsent(cookieConsent || defaultPreferences);
  };

  const saveConsent = (preferences: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setCookieConsent(preferences);
    setOpen(false);
    
    // Ici, vous pourriez implémenter la logique pour activer/désactiver les cookies
    // en fonction des préférences de l'utilisateur
    console.log("Préférences de cookies enregistrées:", preferences);
  };

  const openCookieSettings = () => {
    setCookieConsent(cookieConsent || defaultPreferences);
    setOpen(true);
  };

  // Permettre à d'autres composants d'ouvrir les paramètres de cookies
  window.openCookieSettings = openCookieSettings;

  return (
    <>
      {/* Bannière de cookies */}
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Paramètres de confidentialité</DialogTitle>
              <DialogDescription>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site et vous offrir des contenus personnalisés.
                Vous pouvez choisir les cookies que vous acceptez et modifier vos paramètres à tout moment.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="necessary" 
                  checked={true} 
                  disabled 
                />
                <Label htmlFor="necessary" className="flex flex-col">
                  <span>Cookies nécessaires</span>
                  <span className="text-xs text-muted-foreground">Ces cookies sont indispensables au bon fonctionnement du site.</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="functional" 
                  checked={cookieConsent?.functional || false} 
                  onCheckedChange={(checked) => 
                    setCookieConsent(prev => prev ? {...prev, functional: checked === true} : defaultPreferences)
                  }
                />
                <Label htmlFor="functional" className="flex flex-col">
                  <span>Cookies fonctionnels</span>
                  <span className="text-xs text-muted-foreground">Améliorent les fonctionnalités et la personnalisation.</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="analytics" 
                  checked={cookieConsent?.analytics || false}
                  onCheckedChange={(checked) => 
                    setCookieConsent(prev => prev ? {...prev, analytics: checked === true} : defaultPreferences)
                  }
                />
                <Label htmlFor="analytics" className="flex flex-col">
                  <span>Cookies analytiques</span>
                  <span className="text-xs text-muted-foreground">Nous aident à comprendre comment vous utilisez le site.</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={cookieConsent?.marketing || false}
                  onCheckedChange={(checked) => 
                    setCookieConsent(prev => prev ? {...prev, marketing: checked === true} : defaultPreferences)
                  }
                />
                <Label htmlFor="marketing" className="flex flex-col">
                  <span>Cookies marketing</span>
                  <span className="text-xs text-muted-foreground">Utilisés pour vous montrer des publicités pertinentes.</span>
                </Label>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Refuser tout
                </Button>
                <Button onClick={handleAcceptAll}>
                  Accepter tout
                </Button>
              </div>
              <Button variant="secondary" onClick={handleSavePreferences}>
                Enregistrer les préférences
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Bouton fixe en bas de page pour rouvrir les paramètres */}
      {!open && cookieConsent && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={openCookieSettings}
          className="fixed bottom-4 left-4 z-50 text-xs py-1 px-2 h-auto opacity-80 hover:opacity-100"
        >
          Paramètres des cookies
        </Button>
      )}
    </>
  );
}

// Déclaration pour TypeScript
declare global {
  interface Window {
    openCookieSettings: () => void;
  }
}
