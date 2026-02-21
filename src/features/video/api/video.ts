import { supabase } from '../../../api/supabase';

export const videoService = {
    /**
     * Fetch a dynamic Agora RCT token from Supabase Edge Function
     */
    async getAgoraToken(channelName: string, uid: number = 0) {
        const { data, error } = await supabase.functions.invoke('generate-agora-token', {
            body: { channelName, uid },
        });

        if (error) throw error;
        return data.token;
    }
};
