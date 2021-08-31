import { Dashboard, GTranslate, Spellcheck } from '@material-ui/icons';

export const navigationConfig = [
    {
        title: 'Dashboard',
        icon: <Dashboard />,
        to: '/dashboard'
    }
];

export const navigation2ndSectionConfig = [
    {
        title: 'English dict',
        icon: <GTranslate />,
        to: '/en-pl-dict'
    },
    {
        title: 'Polish dict',
        icon: <Spellcheck />,
        to: '/pl-ru-dict'
    }
];
export const navigation3rdSectionConfig = [
    // {
    //     title: 'Rules',
    //     icon: <AccountBalance />
    //     // to: "/rules"
    // },
    // {
    //     title: 'Cookie Policy',
    //     icon: <Cake />
    //     // to: "/cookie-policy"
    // }
];

export const sidebarItemsList = [navigationConfig, navigation2ndSectionConfig, navigation3rdSectionConfig];
