import { supabase } from './supabase';
import { Database } from '../types/database';

export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];

export const appointmentService = {
    /**
     * Fetch all appointments for a user (patient or clinician)
     */
    async getAppointments(userId: string, role: 'patient' | 'clinician') {
        const column = role === 'patient' ? 'patient_id' : 'clinician_id';
        const { data, error } = await supabase
            .from('appointments')
            .select(`
        *,
        patient:patient_id(id, full_name, email),
        clinician:clinician_id(id, full_name, email)
      `)
            .eq(column, userId)
            .order('scheduled_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    /**
     * Book a new appointment
     */
    async bookAppointment(appointment: AppointmentInsert) {
        const { data, error } = await supabase
            .from('appointments')
            .insert(appointment)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update appointment status
     */
    async updateStatus(id: string, status: Database['public']['Enums']['appointment_status']) {
        const { data, error } = await supabase
            .from('appointments')
            .update({ status })
            .eq(id, id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get list of available clinicians
     */
    async getClinicians() {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .eq('role', 'clinician');

        if (error) throw error;
        return data;
    }
};
