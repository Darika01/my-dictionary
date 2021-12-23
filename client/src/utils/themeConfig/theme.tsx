import { createTheme, SimplePaletteColorOptions, Theme } from '@mui/material/styles';

import { colorPrimaryMain, colorSecondaryMain } from './colors';
import overrides from './MuiComponentsOverrides';
import palette from './palette';
import typography from './typography';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}
declare module '@mui/material/styles' {
    interface PaletteOptions {
        border: PaletteColorOptions;
    }

    interface PaletteColorOptions extends SimplePaletteColorOptions {
        hover?: string;
        active?: string;
    }

    interface PaletteColor extends SimplePaletteColorOptions {
        hover?: string;
        active?: string;
    }
}

export default createTheme({
    palette: palette,
    typography: typography,
    shape: {
        borderRadius: '.4rem'
    },
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
});
