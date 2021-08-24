import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';

import MainLayout from './components/layouts/MainLayout';
import Dashboard from './components/pages/Dashboard';
import PageNotFound from './components/pages/PageNotFound';
import useStyles from './styles';
import useRootFontStyles from './utils/rootFontStyles';
import theme from './utils/themeConfig/theme';

function App() {
    const { pathname } = useLocation();

    return (
        <MainLayout>
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Redirect exact from="/" to="/dashboard" />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/404" component={PageNotFound} />
                <Redirect to="/404" push={false} />
            </Switch>
        </MainLayout>
    );
}

const AppContainer: React.FC = () => {
    useRootFontStyles();
    useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    );
};

export default AppContainer;
