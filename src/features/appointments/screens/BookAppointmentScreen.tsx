import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appointmentService } from '../../../api/appointments';
import { useAuth } from '../../auth/AuthContext';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

export const BookAppointmentScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [clinicians, setClinicians] = useState<any[]>([]);
    const [selectedClinician, setSelectedClinician] = useState<string | null>(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        appointmentService.getClinicians()
            .then(setClinicians)
            .finally(() => setFetching(false));
    }, []);

    const handleBook = async () => {
        if (!selectedClinician) {
            Alert.alert('Selection Required', 'Please select a clinician.');
            return;
        }

        setLoading(true);
        try {
            await appointmentService.bookAppointment({
                patient_id: user!.id,
                clinician_id: selectedClinician,
                scheduled_at: new Date(Date.now() + 86400000).toISOString(), // Appointment for tomorrow
                notes,
            });
            Alert.alert('Success', 'Appointment booked successfully!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Book Appointment</Text>

            <Text style={styles.label}>Select Clinician</Text>
            {clinicians.map((c) => (
                <TouchableOpacity
                    key={c.id}
                    style={[
                        styles.clinicianCard,
                        selectedClinician === c.id && styles.selectedCard
                    ]}
                    onPress={() => setSelectedClinician(c.id)}
                >
                    <Text style={[
                        styles.clinicianName,
                        selectedClinician === c.id && styles.selectedText
                    ]}>
                        {c.full_name}
                    </Text>
                    <Text style={styles.clinicianEmail}>{c.email}</Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.label}>Reason for Consultation</Text>
            <TextInput
                style={styles.input}
                placeholder="Brief description of your concern..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBook}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.bookButtonText}>Confirm Booking</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    content: { padding: Spacing.md },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.lg, color: Colors.light.text },
    label: { fontSize: 16, fontWeight: '600', marginBottom: Spacing.sm, color: Colors.light.textSecondary, marginTop: Spacing.md },
    clinicianCard: {
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginBottom: Spacing.sm,
        backgroundColor: '#fff',
    },
    selectedCard: { borderColor: Colors.light.primary, backgroundColor: Colors.light.primaryLight },
    clinicianName: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
    selectedText: { color: Colors.light.primary },
    clinicianEmail: { fontSize: 14, color: Colors.light.textSecondary },
    input: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        height: 100,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
    },
    bookButton: {
        backgroundColor: Colors.light.primary,
        height: 56,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
    bookButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
