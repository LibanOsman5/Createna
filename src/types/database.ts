// Database type placeholder — generate from Supabase CLI:
// npx supabase gen types typescript --project-id <id> > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: "owner" | "admin" | "member";
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member";
          created_at?: string;
        };
        Update: {
          role?: "owner" | "admin" | "member";
        };
      };
      pipelines: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          description: string | null;
          stages: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          description?: string | null;
          stages?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          stages?: Json;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          organization_id: string;
          pipeline_id: string;
          user_id: string;
          brief: Json;
          status: "queued" | "running" | "awaiting_approval" | "completed" | "failed" | "cancelled";
          current_stage: number;
          total_stages: number;
          cost: number;
          duration_seconds: number | null;
          qc_score: number | null;
          output_asset_id: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          pipeline_id: string;
          user_id: string;
          brief: Json;
          status?: "queued" | "running" | "awaiting_approval" | "completed" | "failed" | "cancelled";
          current_stage?: number;
          total_stages?: number;
          cost?: number;
          duration_seconds?: number | null;
          qc_score?: number | null;
          output_asset_id?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: "queued" | "running" | "awaiting_approval" | "completed" | "failed" | "cancelled";
          current_stage?: number;
          cost?: number;
          duration_seconds?: number | null;
          qc_score?: number | null;
          output_asset_id?: string | null;
          error_message?: string | null;
          updated_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          organization_id: string;
          job_id: string | null;
          pipeline_id: string | null;
          filename: string;
          storage_path: string;
          mime_type: string;
          size_bytes: number;
          duration_seconds: number | null;
          resolution: string | null;
          thumbnail_url: string | null;
          tags: string[] | null;
          version: number;
          status: "draft" | "approved" | "published" | "archived";
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          job_id?: string | null;
          pipeline_id?: string | null;
          filename: string;
          storage_path: string;
          mime_type: string;
          size_bytes: number;
          duration_seconds?: number | null;
          resolution?: string | null;
          thumbnail_url?: string | null;
          tags?: string[] | null;
          version?: number;
          status?: "draft" | "approved" | "published" | "archived";
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          tags?: string[] | null;
          status?: "draft" | "approved" | "published" | "archived";
          version?: number;
          metadata?: Json | null;
          updated_at?: string;
        };
      };
      brand_kits: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          logo_url: string | null;
          colors: Json;
          fonts: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          logo_url?: string | null;
          colors?: Json;
          fonts?: Json;
          created_at?: string;
        };
        Update: {
          name?: string;
          logo_url?: string | null;
          colors?: Json;
          fonts?: Json;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
