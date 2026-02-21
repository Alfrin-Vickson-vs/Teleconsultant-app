import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { Spacing, BorderRadius } from '../../constants/Spacing';

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'longtext';
    options?: string[]; // For select type
    required?: boolean;
    validation?: {
        pattern?: string; // Regex pattern
        message?: string;
    };
}

interface Props {
    fields: FormField[];
    onSubmit: (values: Record<string, any>) => Promise<void> | void;
    submitLabel?: string;
}

export const DynamicForm: React.FC<Props> = ({ fields, onSubmit, submitLabel = 'Submit' }) => {
    const [values, setValues] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (field: FormField, value: any): string => {
        if (field.required && !value) {
            return `This field is required.`;
        }
        if (field.validation?.pattern && value) {
            const regex = new RegExp(field.validation.pattern);
            if (!regex.test(value)) {
                return field.validation.message || 'Invalid format.';
            }
        }
        return '';
    };

    const handleChange = (id: string, value: any) => {
        setValues((prev) => ({ ...prev, [id]: value }));
        // Clear error when user changes value
        if (errors[id]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleInternalSubmit = async () => {
        const newErrors: Record<string, string> = {};
        fields.forEach((field) => {
            const error = validateField(field, values[field.id]);
            if (error) newErrors[field.id] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {fields.map((field, index) => (
                <Animated.View
                    key={field.id}
                    entering={FadeInUp.delay(index * 100)}
                    layout={Layout.springify()}
                    style={styles.fieldContainer}
                >
                    <Text style={styles.label}>
                        {field.label} {field.required && <Text style={styles.required}>*</Text>}
                    </Text>

                    {(field.type === 'text' || field.type === 'number') && (
                        <TextInput
                            style={[styles.input, errors[field.id] && styles.inputError]}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            value={values[field.id] || ''}
                            onChangeText={(text) => handleChange(field.id, text)}
                            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                        />
                    )}

                    {field.type === 'longtext' && (
                        <TextInput
                            style={[styles.input, styles.textArea, errors[field.id] && styles.inputError]}
                            placeholder={`Enter details...`}
                            value={values[field.id] || ''}
                            onChangeText={(text) => handleChange(field.id, text)}
                            multiline
                            numberOfLines={4}
                        />
                    )}

                    {field.type === 'select' && field.options && (
                        <View style={styles.optionsContainer}>
                            {field.options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        values[field.id] === option && styles.selectedOption,
                                        errors[field.id] && styles.inputError
                                    ]}
                                    onPress={() => handleChange(field.id, option)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        values[field.id] === option && styles.selectedOptionText
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {errors[field.id] && (
                        <Text style={styles.errorText}>{errors[field.id]}</Text>
                    )}
                </Animated.View>
            ))}

            <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={handleInternalSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitText}>{submitLabel}</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    content: { padding: Spacing.md },
    fieldContainer: { marginBottom: Spacing.lg },
    label: { fontSize: 16, fontWeight: '600', marginBottom: Spacing.xs, color: Colors.light.text },
    required: { color: Colors.light.error },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
    },
    inputError: {
        borderColor: Colors.light.error,
    },
    errorText: {
        color: Colors.light.error,
        fontSize: 12,
        marginTop: 4,
    },
    textArea: { height: 100, textAlignVertical: 'top', paddingTop: Spacing.sm },
    submitButton: {
        backgroundColor: Colors.light.primary,
        height: 56,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.lg,
        marginBottom: Spacing.xxl,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    optionsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    optionButton: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginRight: Spacing.sm,
        marginBottom: Spacing.sm,
        backgroundColor: '#fff',
    },
    selectedOption: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
    optionText: { color: Colors.light.textSecondary },
    selectedOptionText: { color: '#fff', fontWeight: 'bold' },
});
