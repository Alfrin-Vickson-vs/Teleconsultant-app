import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppointments } from '../../../hooks/useAppointments';
import { AppointmentCard } from '../components/AppointmentCard';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';
import { Ionicons } from '@expo/vector-icons';

export const PatientAppointmentsScreen = () => {
    const navigation = useNavigation<any>();
    const { appointments, loading, refresh } = useAppointments('patient');

    return (
        <View style={styles.container}>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AppointmentCard appointment={item} />}
                contentContainerStyle={styles.list}
                onRefresh={refresh}
                refreshing={loading && appointments.length > 0}
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.empty}>
                            <Ionicons name="calendar-outline" size={64} color={Colors.light.border} />
                            <Text style={styles.emptyText}>No appointments found.</Text>
                        </View>
                    ) : null
                }
                ListHeaderComponent={<Text style={styles.title}>Your Appointments</Text>}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('BookAppointment')}
            >
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.surface },
    list: { padding: Spacing.md, paddingBottom: 100 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.md, color: Colors.light.text },
    empty: { flex: 1, alignItems: 'center', marginTop: 100 },
    emptyText: { color: Colors.light.textSecondary, marginTop: Spacing.md, fontSize: 16 },
    fab: {
        position: 'absolute',
        bottom: Spacing.xl,
        right: Spacing.xl,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.light.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
