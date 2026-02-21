export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            appointments: {
                Row: {
                    clinician_id: string
                    created_at: string | null
                    id: string
                    notes: string | null
                    patient_id: string
                    scheduled_at: string
                    status: Database["public"]["Enums"]["appointment_status"]
                }
                Insert: {
                    clinician_id: string
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    patient_id: string
                    scheduled_at: string
                    status?: Database["public"]["Enums"]["appointment_status"]
                }
                Update: {
                    clinician_id?: string
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    patient_id?: string
                    scheduled_at?: string
                    status?: Database["public"]["Enums"]["appointment_status"]
                }
                Relationships: [
                    {
                        foreignKeyName: "appointments_clinician_id_fkey"
                        columns: ["clinician_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "appointments_patient_id_fkey"
                        columns: ["patient_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            audit_logs: {
                Row: {
                    action: string
                    created_at: string | null
                    id: string
                    metadata: Json | null
                    user_id: string | null
                }
                Insert: {
                    action: string
                    created_at?: string | null
                    id?: string
                    metadata?: Json | null
                    user_id?: string | null
                }
                Update: {
                    action?: string
                    created_at?: string | null
                    id?: string
                    metadata?: Json | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "audit_logs_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            consents: {
                Row: {
                    accepted_at: string | null
                    consent_text: string
                    id: string
                    patient_id: string
                    signature_url: string | null
                }
                Insert: {
                    accepted_at?: string | null
                    consent_text: string
                    id?: string
                    patient_id: string
                    signature_url?: string | null
                }
                Update: {
                    accepted_at?: string | null
                    consent_text?: string
                    id?: string
                    patient_id?: string
                    signature_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "consents_patient_id_fkey"
                        columns: ["patient_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            crf_entries: {
                Row: {
                    appointment_id: string
                    clinician_id: string
                    created_at: string | null
                    crf_json: Json
                    id: string
                }
                Insert: {
                    appointment_id: string
                    clinician_id: string
                    created_at?: string | null
                    crf_json: Json
                    id?: string
                }
                Update: {
                    appointment_id?: string
                    clinician_id?: string
                    created_at?: string | null
                    crf_json?: Json
                    id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "crf_entries_appointment_id_fkey"
                        columns: ["appointment_id"]
                        isOneToOne: false
                        referencedRelation: "appointments"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "crf_entries_clinician_id_fkey"
                        columns: ["clinician_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            epro_forms: {
                Row: {
                    created_at: string | null
                    id: string
                    schema_json: Json
                    title: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    schema_json: Json
                    title: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    schema_json?: Json
                    title?: string
                }
                Relationships: []
            }
            form_responses: {
                Row: {
                    form_id: string
                    id: string
                    patient_id: string
                    response_json: Json
                    submitted_at: string | null
                }
                Insert: {
                    form_id: string
                    id?: string
                    patient_id: string
                    response_json: Json
                    submitted_at?: string | null
                }
                Update: {
                    form_id?: string
                    id?: string
                    patient_id?: string
                    response_json?: Json
                    submitted_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "form_responses_form_id_fkey"
                        columns: ["form_id"]
                        isOneToOne: false
                        referencedRelation: "epro_forms"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "form_responses_patient_id_fkey"
                        columns: ["patient_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    created_at: string | null
                    email: string
                    full_name: string
                    id: string
                    phone: string | null
                    role: Database["public"]["Enums"]["user_role"]
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    full_name: string
                    id: string
                    phone?: string | null
                    role?: Database["public"]["Enums"]["user_role"]
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    full_name?: string
                    id?: string
                    phone?: string | null
                    role?: Database["public"]["Enums"]["user_role"]
                }
                Relationships: []
            }
            tele_logs: {
                Row: {
                    appointment_id: string
                    call_duration: number | null
                    created_at: string | null
                    id: string
                    recording_url: string | null
                }
                Insert: {
                    appointment_id: string
                    call_duration?: number | null
                    created_at?: string | null
                    id?: string
                    recording_url?: string | null
                }
                Update: {
                    appointment_id?: string
                    call_duration?: number | null
                    created_at?: string | null
                    id?: string
                    recording_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "tele_logs_appointment_id_fkey"
                        columns: ["appointment_id"]
                        isOneToOne: false
                        referencedRelation: "appointments"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            appointment_status: "booked" | "confirmed" | "completed" | "cancelled"
            user_role: "patient" | "clinician" | "admin"
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
            appointment_status: ["booked", "confirmed", "completed", "cancelled"],
            user_role: ["patient", "clinician", "admin"],
        },
    },
} as const
