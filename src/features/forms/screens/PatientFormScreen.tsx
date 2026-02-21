import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { DynamicForm, FormField } from '../../../components/forms/DynamicForm';
import { formService } from '../../../api/forms';
import { useAuth } from '../../auth/AuthContext';
import { AppStackParamList } from '../../../navigation/types';
import { Colors } from '../../../constants/Colors';
import { Spacing } from '../../../constants/Spacing';

// Hardcoded example schema for ePRO
const PRESET_FIELDS: FormField[] = [
    { id: 'symptom_severity', label: 'How severe are your symptoms?', type: 'select', options: ['None', 'Mild', 'Moderate', 'Severe'], required: true },
    { id: 'pain_level', label: 'Pain Level (0-10)', type: 'number', required: true },
    { id: 'feedback', label: 'Additional Comments', type: 'longtext' }
];

export const PatientFormScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    // Using generic form for now; in production, form_id would come from navigation params
    const formId = '8ee94eb4-474c-47b2-a4f6-82aeaeaeaeae';

    const handleSubmit = async (values: Record<string, any>) => {
        try {
            await formService.submitFormResponse({
                patient_id: user!.id,
                form_id: formId,
                response_json: values,
            });
            Alert.alert('Success', 'Your response has been submitted.');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Submission failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Health Questionnaire</Text>
            <DynamicForm fields={PRESET_FIELDS} onSubmit={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', padding: Spacing.md, color: Colors.light.primary },
});
