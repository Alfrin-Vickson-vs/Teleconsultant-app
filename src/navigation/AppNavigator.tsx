import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { PatientAppointmentsScreen } from '../features/appointments/screens/PatientAppointmentsScreen';
import { BookAppointmentScreen } from '../features/appointments/screens/BookAppointmentScreen';
import { ClinicianDashboardScreen } from '../features/appointments/screens/ClinicianDashboardScreen';
import { VideoCallScreen } from '../features/video/screens/VideoCallScreen';
import { PatientFormScreen } from '../features/forms/screens/PatientFormScreen';
import { ClinicianCRFScreen } from '../features/forms/screens/ClinicianCRFScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#005FB8' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Teleconsultation' }} />
            <Stack.Screen name="PatientAppointments" component={PatientAppointmentsScreen} options={{ title: 'My Appointments' }} />
            <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} options={{ title: 'Schedule Call' }} />
            <Stack.Screen name="ClinicianDashboard" component={ClinicianDashboardScreen} options={{ title: 'Clinician Portal' }} />
            <Stack.Screen name="VideoCall" component={VideoCallScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PatientForm" component={PatientFormScreen} options={{ title: 'Health Form' }} />
            <Stack.Screen name="ClinicianCRF" component={ClinicianCRFScreen} options={{ title: 'Clinician Entry' }} />
        </Stack.Navigator>
    );
};
