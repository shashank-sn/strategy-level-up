export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      audience_personas: {
        Row: {
          created_at: string
          demographics: Json | null
          goals: Json | null
          id: string
          is_primary: boolean | null
          pain_points: Json | null
          persona_name: string
          preferred_channels: Json | null
          psychographics: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          demographics?: Json | null
          goals?: Json | null
          id?: string
          is_primary?: boolean | null
          pain_points?: Json | null
          persona_name: string
          preferred_channels?: Json | null
          psychographics?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          demographics?: Json | null
          goals?: Json | null
          id?: string
          is_primary?: boolean | null
          pain_points?: Json | null
          persona_name?: string
          preferred_channels?: Json | null
          psychographics?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      brand_audits: {
        Row: {
          completed_at: string | null
          completion_percentage: number | null
          created_at: string
          id: string
          max_possible_score: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["audit_status"] | null
          title: string
          total_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          id?: string
          max_possible_score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["audit_status"] | null
          title: string
          total_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          id?: string
          max_possible_score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["audit_status"] | null
          title?: string
          total_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      brand_blueprints: {
        Row: {
          brand_pillars: Json | null
          created_at: string
          id: string
          implementation_roadmap: Json | null
          messaging_framework: Json | null
          positioning_statement: string | null
          updated_at: string
          user_id: string
          visual_identity_guidelines: Json | null
          voice_and_tone: Json | null
        }
        Insert: {
          brand_pillars?: Json | null
          created_at?: string
          id?: string
          implementation_roadmap?: Json | null
          messaging_framework?: Json | null
          positioning_statement?: string | null
          updated_at?: string
          user_id: string
          visual_identity_guidelines?: Json | null
          voice_and_tone?: Json | null
        }
        Update: {
          brand_pillars?: Json | null
          created_at?: string
          id?: string
          implementation_roadmap?: Json | null
          messaging_framework?: Json | null
          positioning_statement?: string | null
          updated_at?: string
          user_id?: string
          visual_identity_guidelines?: Json | null
          voice_and_tone?: Json | null
        }
        Relationships: []
      }
      brand_foundation: {
        Row: {
          brand_personality: Json | null
          brand_story: string | null
          core_values: Json | null
          created_at: string
          id: string
          mission_statement: string | null
          unique_value_proposition: string | null
          updated_at: string
          user_id: string
          vision_statement: string | null
        }
        Insert: {
          brand_personality?: Json | null
          brand_story?: string | null
          core_values?: Json | null
          created_at?: string
          id?: string
          mission_statement?: string | null
          unique_value_proposition?: string | null
          updated_at?: string
          user_id: string
          vision_statement?: string | null
        }
        Update: {
          brand_personality?: Json | null
          brand_story?: string | null
          core_values?: Json | null
          created_at?: string
          id?: string
          mission_statement?: string | null
          unique_value_proposition?: string | null
          updated_at?: string
          user_id?: string
          vision_statement?: string | null
        }
        Relationships: []
      }
      competitive_analysis: {
        Row: {
          competitor_name: string
          competitor_type: string | null
          created_at: string
          id: string
          market_share: string | null
          notes: string | null
          positioning: Json | null
          pricing_strategy: string | null
          strengths: Json | null
          updated_at: string
          user_id: string
          weaknesses: Json | null
        }
        Insert: {
          competitor_name: string
          competitor_type?: string | null
          created_at?: string
          id?: string
          market_share?: string | null
          notes?: string | null
          positioning?: Json | null
          pricing_strategy?: string | null
          strengths?: Json | null
          updated_at?: string
          user_id: string
          weaknesses?: Json | null
        }
        Update: {
          competitor_name?: string
          competitor_type?: string | null
          created_at?: string
          id?: string
          market_share?: string | null
          notes?: string | null
          positioning?: Json | null
          pricing_strategy?: string | null
          strengths?: Json | null
          updated_at?: string
          user_id?: string
          weaknesses?: Json | null
        }
        Relationships: []
      }
      module_progress: {
        Row: {
          completed_at: string | null
          completion_percentage: number | null
          created_at: string
          id: string
          is_completed: boolean | null
          is_unlocked: boolean | null
          max_score: number | null
          module_id: string
          module_name: string
          module_type: Database["public"]["Enums"]["module_type"]
          score: number | null
          started_at: string | null
          time_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          is_unlocked?: boolean | null
          max_score?: number | null
          module_id: string
          module_name: string
          module_type: Database["public"]["Enums"]["module_type"]
          score?: number | null
          started_at?: string | null
          time_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          is_unlocked?: boolean | null
          max_score?: number | null
          module_id?: string
          module_name?: string
          module_type?: Database["public"]["Enums"]["module_type"]
          score?: number | null
          started_at?: string | null
          time_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      module_responses: {
        Row: {
          created_at: string
          id: string
          module_id: string
          question_id: string
          question_text: string
          response_data: Json
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          module_id: string
          question_id: string
          question_text: string
          response_data: Json
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string
          question_id?: string
          question_text?: string
          response_data?: Json
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          brand_health_score: number | null
          created_at: string
          current_module_id: string | null
          id: string
          last_activity_at: string | null
          overall_completion_percentage: number | null
          total_time_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          brand_health_score?: number | null
          created_at?: string
          current_module_id?: string | null
          id?: string
          last_activity_at?: string | null
          overall_completion_percentage?: number | null
          total_time_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          brand_health_score?: number | null
          created_at?: string
          current_module_id?: string | null
          id?: string
          last_activity_at?: string | null
          overall_completion_percentage?: number | null
          total_time_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "user"
      audit_status: "draft" | "in_progress" | "completed"
      module_type: "assessment" | "learning" | "strategy_building"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      audit_status: ["draft", "in_progress", "completed"],
      module_type: ["assessment", "learning", "strategy_building"],
    },
  },
} as const
