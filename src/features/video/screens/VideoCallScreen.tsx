import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { videoService } from '../api/video';
import { AppStackParamList } from '../../../navigation/types';
import { Colors } from '../../../constants/Colors';
import { Spacing } from '../../../constants/Spacing';

type VideoCallRouteProp = RouteProp<AppStackParamList, 'VideoCall'>;

export const VideoCallScreen = () => {
    const route = useRoute<VideoCallRouteProp>();
    const navigation = useNavigation();
    const { channelName } = route.params;

    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const uid = Math.floor(Math.random() * 10000);
                const fetchedToken = await videoService.getAgoraToken(channelName, uid);
                setToken(fetchedToken);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch video token');
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, [channelName]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
                <Text style={styles.text}>Initializing secure connection...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Return to Dashboard</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const connectionData = {
        appId: '7ff7252801c347e6a9a5d0cd164bf520', // User provided App ID
        channel: channelName,
        token: token,
    };

    const callbacks = {
        EndCall: () => navigation.goBack(),
    };

    return (
        <View style={styles.container}>
            <AgoraUIKit
                connectionData={connectionData}
                rtcCallbacks={callbacks}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl, backgroundColor: '#fff' },
    text: { marginTop: Spacing.md, color: Colors.light.textSecondary },
    error: { color: Colors.light.error, textAlign: 'center', marginBottom: Spacing.xl },
    button: { padding: Spacing.md, backgroundColor: Colors.light.primary, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
