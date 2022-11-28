import InfoSnackbar from 'components/molecules/InfoSnackbar';
import SecuredRoute from 'components/molecules/SecuredRoute';
import Dashboard from 'components/pages/Dashboard';
import Dictionary from 'components/pages/Dictionary';
import Login from 'components/pages/Login';
import Settings from 'components/pages/Settings';
import { GlobalContextProvider } from 'context/globalContext';
import { Provider } from 'react-redux';
import {
    Redirect,
    Route,
    Router,
    Switch,
    useLocation
} from 'react-router-dom';
import { alertActions } from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { store } from 'redux/store';
import { checkUserIsLoggedIn } from 'utils/authenticationService';
import history from 'utils/history';

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
    const alert = useAppSelector(state => state.alert);
    const dispatch = useAppDispatch();
    return (
        <>
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
            {alert && (
                <InfoSnackbar
                    variant={alert.variant}
                    message={alert.message}
                    onClose={() => dispatch(alertActions.close())}
                />
            )}
        </>
    );
}

const AppContainer: React.FC = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalContextProvider>
                    <Provider store={store}>
                        <Router history={history}>
                            <App />
                        </Router>
                    </Provider>
                </GlobalContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default AppContainer;
