export type AuthStackParamList = {
    Login: undefined;
    OTPVerify: { phone: string };
    Signup: { phone: string };
};

export type AppStackParamList = {
    Home: undefined;
    BookAppointment: undefined;
    PatientAppointments: undefined;
    ClinicianDashboard: undefined;
    VideoCall: { appointmentId: string; channelName: string };
    PatientForm: { formId?: string };
    ClinicianCRF: { appointmentId: string };
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;
