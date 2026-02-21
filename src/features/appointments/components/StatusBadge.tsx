import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Database } from '../../../types/database';
import { Colors } from '../../../constants/Colors';
import { Spacing, BorderRadius } from '../../../constants/Spacing';

type Status = Database['public']['Enums']['appointment_status'];

interface Props {
    status: Status;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
    const getStyle = () => {
        switch (status) {
            case 'confirmed': return styles.confirmed;
            case 'completed': return styles.completed;
            case 'cancelled': return styles.cancelled;
            default: return styles.booked;
        }
    };

    return (
        <View style={[styles.badge, getStyle()]}>
            <Text style={styles.text}>{status.toUpperCase()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.sm,
        alignSelf: 'flex-start',
    },
    text: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    booked: { backgroundColor: Colors.light.primary },
    confirmed: { backgroundColor: Colors.light.secondary },
    completed: { backgroundColor: Colors.light.success },
    cancelled: { backgroundColor: Colors.light.error },
});
