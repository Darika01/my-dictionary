import { createTheme, Theme } from '@mui/material/styles';

import overrides from './MuiComponentsOverrides';
import typography from './typography';

export const colorPrimaryMain = 'rgba(18, 21, 70, 1)'; // #121546
export const colorSecondaryMain = 'rgba(234, 90, 118, 1)'; // #ea5a76
export const colorErrorMain = 'rgba(226, 60, 60, 1)'; // #e23c3c
export const colorWarningMain = 'rgba(237, 194, 66, 1)'; // #edc242

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

export default createTheme({
    palette: {
        mode: 'light',
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
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                html {
                    * {
                        scrollbar-width: thin;
                        scrollbar-color: ${colorSecondaryMain} ${colorPrimaryMain};
                    }
                    *::-webkit-scrollbar {
                        width: .4rem;
                        height: .4rem;
                    }
                    *::-webkit-scrollbar-track {
                        background: black;
                    }
                    *::-webkit-scrollbar-thumb {
                        background-color: ${colorSecondaryMain};
                        borderRadius: 1rem;
                    }

                }
            `
        },
        ...overrides
    }
    // props: {
    //     MuiButtonBase: {
    //         disableRipple: true
    //     }
    // }
});
