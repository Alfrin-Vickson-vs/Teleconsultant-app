import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { authService } from '../../../api/auth';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'OTPVerify'>;
type OTPScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'OTPVerify'>;

export const OTPScreen = () => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const route = useRoute<OTPScreenRouteProp>();
    const navigation = useNavigation<OTPScreenNavigationProp>();
    const { phone } = route.params;

    const handleVerifyOTP = async () => {
        if (token.length < 6) {
            Alert.alert('Invalid OTP', 'Please enter a 6-digit code.');
            return;
        }

        setLoading(true);
        try {
            await authService.verifyOTP(phone, token);
            // Supabase onAuthStateChange will handle navigation to App
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Verification failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Enter the 6-digit code sent to {phone}</Text>

            <TextInput
                style={styles.input}
                placeholder="123456"
                value={token}
                onChangeText={setToken}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOTP}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Verify</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.resendButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <Text style={styles.resendText}>Change Phone Number</Text>
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
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 8,
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
    resendButton: {
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    resendText: {
        color: Colors.light.primary,
        fontSize: 16,
    },
});
