import { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { appointmentService } from '../api/appointments';
import { useAuth } from '../features/auth/AuthContext';
import { Database } from '../types/database';

export const useAppointments = (role: 'patient' | 'clinician') => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAppointments = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = await appointmentService.getAppointments(user.id, role);
            setAppointments(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();

        if (!user) return;

        // Realtime subscription
        const column = role === 'patient' ? 'patient_id' : 'clinician_id';
        const channel = supabase
            .channel('appointment_updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'appointments',
                    filter: `${column}=eq.${user.id}`,
                },
                () => {
                    fetchAppointments(); // Refresh on changes
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, role]);

    return { appointments, loading, error, refresh: fetchAppointments };
};
