import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

interface AppointmentCardProps {
    appointment: any;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const navigation = useNavigation<any>();

    const getStatusColor = () => {
        switch (appointment.status) {
            case 'confirmed': return Colors.light.success;
            case 'completed': return Colors.light.secondary;
            case 'cancelled': return Colors.light.error;
            default: return Colors.light.primary;
        }
    };

    return (
        <Animated.View
            entering={FadeInRight.duration(400)}
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
                    <Text style={styles.statusText}>{appointment.status.toUpperCase()}</Text>
                </View>
                <Text style={styles.date}>{new Date(appointment.scheduled_at).toLocaleString()}</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.info}>
                    <Text style={styles.title}>Consultation</Text>
                    <Text style={styles.subtitle}>ID: {appointment.id.split('-')[0]}</Text>
                    {appointment.notes && (
                        <Text style={styles.notes} numberOfLines={2}>
                            Note: {appointment.notes}
                        </Text>
                    )}
                </View>

                {appointment.status === 'confirmed' && (
                    <TouchableOpacity
                        style={styles.callButton}
                        onPress={() => navigation.navigate('VideoCall', {
                            appointmentId: appointment.id,
                            channelName: `room-${appointment.id}`
                        })}
                    >
                        <Ionicons name="videocam" size={24} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: Spacing.xs,
    },
    statusBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.full,
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    date: {
        color: Colors.light.textSecondary,
        fontSize: 12,
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.textSecondary,
        marginTop: 2,
    },
    notes: {
        fontSize: 12,
        color: Colors.light.textSecondary,
        marginTop: Spacing.xs,
        fontStyle: 'italic',
    },
    callButton: {
        backgroundColor: Colors.light.success,
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Spacing.md,
    },
});
