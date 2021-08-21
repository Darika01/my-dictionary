import { createTheme } from '@material-ui/core/styles';

import typography from './typography';

export const colorPrimaryMain = 'rgba(18, 21, 70, 1)'; // #121546
export const colorSecondaryMain = 'rgba(234, 90, 118, 1)'; // #ea5a76
export const colorErrorMain = 'rgba(226, 60, 60, 1)'; // #e23c3c
export const colorWarningMain = 'rgba(237, 194, 66, 1)'; // #edc242

export default createTheme({
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
        MuiFormHelperText: {
            root: {
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 1.66,
                letterSpacing: '0.03333em',
                marginTop: 4
            },
            contained: {
                marginLeft: 0,
                marginRight: 0
            }
        }
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});
