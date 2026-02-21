import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../features/auth/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { View, ActivityIndicator } from 'react-native';

export const RootNavigator = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#005FB8" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {session ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};
