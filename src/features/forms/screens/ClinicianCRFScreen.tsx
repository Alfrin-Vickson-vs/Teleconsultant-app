import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { DynamicForm, FormField } from '../../../components/forms/DynamicForm';
import { formService } from '../../../api/forms';
import { useAuth } from '../../auth/AuthContext';
import { AppStackParamList } from '../../../navigation/types';
import { Colors } from '../../../constants/Colors';
import { Spacing } from '../../../constants/Spacing';

const CRF_FIELDS: FormField[] = [
    { id: 'diagnosis', label: 'Primary Diagnosis', type: 'text', required: true },
    { id: 'clinical_notes', label: 'Clinical Observations', type: 'longtext', required: true },
    { id: 'prescription', label: 'Prescription / Care Plan', type: 'longtext' },
    { id: 'follow_up', label: 'Follow-up Recommended?', type: 'select', options: ['Yes', 'No'] }
];

export const ClinicianCRFScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const route = useRoute<any>(); // Should use typed route
    const appointmentId = route.params?.appointmentId || '00000000-0000-0000-0000-000000000000';

    const handleSubmit = async (values: Record<string, any>) => {
        try {
            await formService.saveCRFEntry({
                appointment_id: appointmentId,
                clinician_id: user!.id,
                crf_json: values,
            });
            Alert.alert('Success', 'Clinical documentation saved.');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Saving failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Consultation Summary (CRF)</Text>
            <DynamicForm
                fields={CRF_FIELDS}
                onSubmit={handleSubmit}
                submitLabel="Finalize and Save"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', padding: Spacing.md, color: Colors.light.primary },
});
