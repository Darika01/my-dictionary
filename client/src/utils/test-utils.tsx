import { FC, ReactElement } from 'react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { render, RenderOptions } from '@testing-library/react';

import theme from './themeConfig/theme';

const generateClassName = (rule: any, sheet: any) => `${sheet.options.classNamePrefix}-${rule.key}`;

const history = createMemoryHistory();
// const { GlobalContextProvider } = globalContext;

const CommonProviders: FC = ({ children }) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router history={history}>{children}</Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

// const CommonProvidersWithGlobalContext: FC = ({ children }) => {
//     return (
//         <GlobalContextProvider>
//             <CommonProviders>
//                 <SnackbarProvider>{children}</SnackbarProvider>
//             </CommonProviders>
//         </GlobalContextProvider>
//     );
// };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
    render(ui, { wrapper: CommonProviders, ...options });

// const renderGlobalContext = (
//     ui: ReactElement,
//     options?: Omit<RenderOptions, "queries">
// ) => render(ui, { wrapper: CommonProvidersWithGlobalContext, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
