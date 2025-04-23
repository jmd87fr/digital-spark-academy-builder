export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achats: {
        Row: {
          date_achat: string | null
          ebook_id: string | null
          formation_format_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          date_achat?: string | null
          ebook_id?: string | null
          formation_format_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          date_achat?: string | null
          ebook_id?: string | null
          formation_format_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ebook: {
        Row: {
          catégorie: string | null
          description: string | null
          id: string
          prix: number | null
          titre: string | null
        }
        Insert: {
          catégorie?: string | null
          description?: string | null
          id?: string
          prix?: number | null
          titre?: string | null
        }
        Update: {
          catégorie?: string | null
          description?: string | null
          id?: string
          prix?: number | null
          titre?: string | null
        }
        Relationships: []
      }
      ebook_formats: {
        Row: {
          "ebook-id": string | null
          format_fichier: string
          id: string
          URL_fichier: string | null
        }
        Insert: {
          "ebook-id"?: string | null
          format_fichier?: string
          id?: string
          URL_fichier?: string | null
        }
        Update: {
          "ebook-id"?: string | null
          format_fichier?: string
          id?: string
          URL_fichier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ebook_formats_ebook-id_fkey"
            columns: ["ebook-id"]
            isOneToOne: false
            referencedRelation: "ebook"
            referencedColumns: ["id"]
          },
        ]
      }
      formations: {
        Row: {
          description: string | null
          id: string
          image_url: string | null
          objectif: string | null
          public_cible: string | null
          theme: string | null
          titre: string | null
          video_teaser: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          image_url?: string | null
          objectif?: string | null
          public_cible?: string | null
          theme?: string | null
          titre?: string | null
          video_teaser?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          image_url?: string | null
          objectif?: string | null
          public_cible?: string | null
          theme?: string | null
          titre?: string | null
          video_teaser?: string | null
        }
        Relationships: []
      }
      formations_formats: {
        Row: {
          format_fichier: string
          "formation-id": string | null
          id: string
          intitule_format: string | null
          lien_moodle: string | null
          prix: number | null
        }
        Insert: {
          format_fichier?: string
          "formation-id"?: string | null
          id?: string
          intitule_format?: string | null
          lien_moodle?: string | null
          prix?: number | null
        }
        Update: {
          format_fichier?: string
          "formation-id"?: string | null
          id?: string
          intitule_format?: string | null
          lien_moodle?: string | null
          prix?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "formations_formats_ebook-id_fkey"
            columns: ["formation-id"]
            isOneToOne: false
            referencedRelation: "ebook"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formations_formats_formation-id_fkey"
            columns: ["formation-id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { required_role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
