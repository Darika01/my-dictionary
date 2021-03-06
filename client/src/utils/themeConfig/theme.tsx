import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import overrides from './MuiComponentsOverrides';
import typography from './typography';

export const colorPrimaryMain = 'rgba(18, 21, 70, 1)'; // #121546
export const colorSecondaryMain = 'rgba(234, 90, 118, 1)'; // #ea5a76
export const colorErrorMain = 'rgba(226, 60, 60, 1)'; // #e23c3c
export const colorWarningMain = 'rgba(237, 194, 66, 1)'; // #edc242

export default createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: 'rgba(31, 36, 120, 1)', // 15% lighter
            main: colorPrimaryMain,
            dark: 'rgba(15, 18, 59, 1)' // 15% darker
        },
        secondary: {
            light: 'rgba(237, 115, 139, 1)', // 15% lighter
            main: colorSecondaryMain,
            dark: 'rgba(228, 47, 82, 1)' // 15% darker
        },
        error: {
            main: colorErrorMain
        },
        warning: {
            main: colorWarningMain
        }
    },
    typography: typography,
    // divider: {
    //     border: `.1rem solid ${palette.border.primary}`
    // },
    //@ts-ignore
    overrides: {
        MuiCssBaseline: {
            '@global': {
                /* Works on Firefox */
                '*': {
                    'scrollbar-width': 'thin',
                    'scrollbar-color': `${colorSecondaryMain} ${colorPrimaryMain}`
                },
                /* Works on Chrome, Edge, and Safari */
                '*::-webkit-scrollbar': {
                    width: '4px',
                    height: '4px'
                },
                '*::-webkit-scrollbar-track': {
                    background: 'black'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: colorSecondaryMain,
                    borderRadius: '10px'
                }
            }
        },
        ...overrides
    }
    // props: {
    //     MuiButtonBase: {
    //         disableRipple: true
    //     }
    // }
});
