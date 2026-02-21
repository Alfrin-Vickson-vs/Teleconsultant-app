import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { authService } from '../../../api/auth';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleSendOTP = async () => {
        if (!phone || phone.length < 10) {
            Alert.alert('Invalid Phone', 'Please enter a valid phone number with country code (e.g., +11234567890)');
            return;
        }

        setLoading(true);
        try {
            await authService.signInWithPhone(phone);
            navigation.navigate('OTPVerify', { phone });
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teleconsultation App</Text>
            <Text style={styles.subtitle}>Enter your phone number to continue</Text>

            <TextInput
                style={styles.input}
                placeholder="+11234567890"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoFocus
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSendOTP}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Send OTP</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.xl,
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginBottom: Spacing.xs,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        marginBottom: Spacing.xl,
        textAlign: 'center',
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        fontSize: 18,
        marginBottom: Spacing.lg,
    },
    button: {
        height: 56,
        backgroundColor: Colors.light.primary,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
