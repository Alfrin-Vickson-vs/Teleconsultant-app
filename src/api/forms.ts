import { supabase } from './supabase';
import { Database } from '../types/database';

export type ePROForm = Database['public']['Tables']['epro_forms']['Row'];
export type FormResponseInsert = Database['public']['Tables']['form_responses']['Insert'];
export type CRFEntryInsert = Database['public']['Tables']['crf_entries']['Insert'];

export const formService = {
    /**
     * Fetch a specific form template by ID
     */
    async getFormTemplate(id: string) {
        const { data, error } = await supabase
            .from('epro_forms')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Fetch all available form templates
     */
    async getFormTemplates() {
        const { data, error } = await supabase
            .from('epro_forms')
            .select('*');

        if (error) throw error;
        return data;
    },

    /**
     * Submit a patient response to a form
     */
    async submitFormResponse(response: FormResponseInsert) {
        const { data, error } = await supabase
            .from('form_responses')
            .insert(response)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Save a clinician CRF entry
     */
    async saveCRFEntry(entry: CRFEntryInsert) {
        const { data, error } = await supabase
            .from('crf_entries')
            .insert(entry)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
