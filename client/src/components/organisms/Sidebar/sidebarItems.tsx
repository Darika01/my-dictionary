import {
    AccountBalance,
    Cake,
    Dashboard,
    Help,
    Info
} from '@material-ui/icons';

export const navigationConfig = [
    {
        title: 'Dashboard',
        icon: <Dashboard />,
        to: '/dashboard'
    }
];

export const navigation2ndSectionConfig = [
    {
        title: 'Help',
        icon: <Help />
    },
    {
        title: 'Contact',
        icon: <Info />
    }
];
export const navigation3rdSectionConfig = [
    {
        title: 'Rules',
        icon: <AccountBalance />
        // to: "/rules"
    },
    {
        title: 'Cookie Policy',
        icon: <Cake />
        // to: "/cookie-policy"
    }
];

export const sidebarItemsList = [navigationConfig, navigation2ndSectionConfig, navigation3rdSectionConfig];
