import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { appointmentService } from '../../../api/appointments';
import { useAuth } from '../../../features/auth/AuthContext';
import { AppointmentCard } from '../components/AppointmentCard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

export const ClinicianDashboardScreen = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigation = useNavigation<any>();

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await appointmentService.getAppointments(user!.id, 'clinician');
            setAppointments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchAppointments();
    }, [user]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
                <Text style={styles.title}>Your Appointments</Text>
                <Text style={styles.subtitle}>{appointments.length} scheduled sessions</Text>
            </Animated.View>

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View key={item.id}>
                        <AppointmentCard appointment={item} />
                        <TouchableOpacity
                            style={styles.crfButton}
                            onPress={() => navigation.navigate('ClinicianCRF', { appointmentId: item.id })}
                        >
                            <Ionicons name="medical" size={18} color="#fff" />
                            <Text style={styles.crfButtonText}>Add Clinical Note (CRF)</Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons name="calendar-outline" size={64} color={Colors.light.border} />
                        <Text style={styles.emptyText}>No appointments found.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    list: { padding: Spacing.md },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { padding: Spacing.md, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: Spacing.sm },
    title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text },
    subtitle: { fontSize: 14, color: Colors.light.textSecondary, marginTop: 4 },
    crfButton: {
        flexDirection: 'row',
        backgroundColor: Colors.light.primary,
        padding: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -Spacing.xs,
        marginBottom: Spacing.lg,
        marginHorizontal: Spacing.xs,
    },
    crfButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: Spacing.xs, fontSize: 14 },
    empty: { alignItems: 'center', marginTop: 100 },
    emptyText: { marginTop: Spacing.md, color: Colors.light.textSecondary, fontSize: 16 },
});
