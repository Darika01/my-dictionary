import { createRef } from 'react';

import ArrowTooltip from 'components/atoms/ArrowTooltip';
import SecuredRoute from 'components/molecules/SecuredRoute';
import Dashboard from 'components/pages/Dashboard';
import Dictionary from 'components/pages/Dictionary';
import Login from 'components/pages/Login';
import Settings from 'components/pages/Settings';
import { GlobalContextProvider } from 'context/globalContext';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation
} from 'react-router-dom';
import { checkUserIsLoggedIn } from 'utils/authenticationService';

import { Close, Error } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import PageNotFound from './components/pages/PageNotFound';
import useStyles from './styles';
import useRootFontStyles from './utils/rootFontStyles';
import theme from './utils/themeConfig/theme';

function App() {
    const { pathname } = useLocation();
    const isUserLoggedIn = checkUserIsLoggedIn();
    useRootFontStyles();
    useStyles();
    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Redirect exact from="/" to="/dashboard" />
            <Route exact path="/login">
                {isUserLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/dictionary/:dictName" component={Dictionary} />
            <SecuredRoute exact path="/settings" component={Settings} />
            <SecuredRoute exact path="/404" component={PageNotFound} />
            <Redirect to="/404" push={false} />
        </Switch>
    );
}

const AppContainer: React.FC = () => {
    const notistackRef = createRef<SnackbarProvider>();
    const onClickDismiss = (key: SnackbarKey) => () => {
        notistackRef.current?.closeSnackbar(key);
    };
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalContextProvider>
                    <SnackbarProvider
                        maxSnack={4}
                        ref={notistackRef}
                        autoHideDuration={3300}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom'
                        }}
                        transitionDuration={{
                            enter: 300,
                            exit: 150
                        }}
                        iconVariant={{
                            error: <Error style={{ marginRight: '.8rem' }} />
                        }}
                        disableWindowBlurListener
                        action={(key: any) => (
                            <ArrowTooltip title="Close">
                                <IconButton key="close" onClick={onClickDismiss(key)} color="inherit">
                                    <Close />
                                </IconButton>
                            </ArrowTooltip>
                        )}
                    >
                        <Router>
                            <App />
                        </Router>
                    </SnackbarProvider>
                </GlobalContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default AppContainer;
