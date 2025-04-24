import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // nécessaire pour GitHub Pages avec domaine personnalisé
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'copy-cname',
      closeBundle: () => {
        try {
          copyFileSync(path.resolve(__dirname, 'CNAME'), path.resolve(__dirname, 'dist/CNAME'));
          console.log('✅ Fichier CNAME copié dans dist/');
        } catch (err) {
          console.warn('⚠️ Impossible de copier le fichier CNAME :', err);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
