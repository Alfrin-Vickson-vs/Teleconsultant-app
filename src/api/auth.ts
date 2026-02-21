import { supabase } from './supabase';

export const authService = {
    /**
     * Send OTP to a phone number
     */
    async signInWithPhone(phone: string) {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone,
        });
        if (error) throw error;
        return data;
    },

    /**
     * Verify OTP
     */
    async verifyOTP(phone: string, token: string) {
        const { data, error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms',
        });
        if (error) throw error;
        return data;
    },

    /**
     * Sign out
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Get current session
     */
    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },
};
