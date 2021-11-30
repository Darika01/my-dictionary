import { Dashboard, GTranslate, Settings, Spellcheck } from '@mui/icons-material';

export const navigationConfig = [
    {
        title: 'Dashboard',
        icon: <Dashboard />,
        to: '/dashboard'
    }
];

export const navigation2ndSectionConfig = [
    {
        title: 'EN-PL dict',
        icon: <GTranslate />,
        to: '/dictionary/en-pl'
    },
    {
        title: 'Pl-EN dict',
        icon: <GTranslate />,
        to: '/dictionary/pl-en'
    },
    {
        title: 'PL-RU dict',
        icon: <Spellcheck />,
        to: '/dictionary/pl-ru'
    }
];
export const navigation3rdSectionConfig = [
    {
        title: 'Settings',
        icon: <Settings />,
        to: '/settings'
    }
];

export const sidebarItemsList = [navigationConfig, navigation2ndSectionConfig, navigation3rdSectionConfig];
