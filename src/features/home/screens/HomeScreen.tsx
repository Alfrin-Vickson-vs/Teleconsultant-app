import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

export const HomeScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Animated.View entering={FadeIn.duration(800)} style={styles.header}>
                <Text style={styles.welcome}>Welcome,</Text>
                <Text style={styles.name}>{user?.user_metadata?.full_name || 'Patient'}</Text>
            </Animated.View>

            <View style={styles.grid}>
                <Animated.View entering={FadeInUp.delay(200)}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#E3F2FD' }]}
                        onPress={() => navigation.navigate('PatientAppointments')}
                    >
                        <Ionicons name="calendar" size={32} color="#1976D2" />
                        <Text style={styles.cardTitle}>My Appointments</Text>
                        <Text style={styles.cardSubtitle}>View scheduled calls</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(300)}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#F3E5F5' }]}
                        onPress={() => navigation.navigate('PatientForm')}
                    >
                        <Ionicons name="clipboard" size={32} color="#7B1FA2" />
                        <Text style={styles.cardTitle}>Health Forms</Text>
                        <Text style={styles.cardSubtitle}>Complete health surveys</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(400)}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#E8F5E9' }]}
                        onPress={() => navigation.navigate('BookAppointment')}
                    >
                        <Ionicons name="add-circle" size={32} color="#388E3C" />
                        <Text style={styles.cardTitle}>Book Call</Text>
                        <Text style={styles.cardSubtitle}>Schedule a new session</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    content: { padding: Spacing.xl },
    header: { marginBottom: Spacing.xl, marginTop: Spacing.md },
    welcome: { fontSize: 16, color: Colors.light.textSecondary },
    name: { fontSize: 28, fontWeight: 'bold', color: Colors.light.primary },
    grid: { marginTop: Spacing.md },
    card: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.lg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: Spacing.md, color: Colors.light.text },
    cardSubtitle: { fontSize: 14, color: Colors.light.textSecondary, marginTop: 4 },
});
