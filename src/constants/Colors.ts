/**
 * Healthcare-themed color palette
 * Focused on trust, clarity, and accessibility.
 */

const palette = {
    primary: '#005FB8', // Trustworthy Blue
    primaryLight: '#E6F0F9',
    secondary: '#00A699', // Caring Teal
    accent: '#FF5A5F', // Urgent/Action Coral
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1C1C1C',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#B00020',
    success: '#2E7D32',
    warning: '#ED6C02',
};

export const Colors = {
    light: {
        ...palette,
    },
    dark: {
        // Basic dark mode placeholder
        ...palette,
        background: '#121212',
        surface: '#1E1E1E',
        text: '#FFFFFF',
        textSecondary: '#AAAAAA',
    },
};
