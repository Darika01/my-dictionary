import MainLayout from 'components/layouts/MainLayout';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { checkUserIsLoggedIn } from 'utils/authenticationService';

const SecuredRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    return (
        <MainLayout>
            <Route
                {...rest}
                render={props => {
                    const isUserLoggedIn = checkUserIsLoggedIn();
                    if (!isUserLoggedIn) {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        );
                    }
                    return Component ? <Component {...props} /> : <></>;
                }}
            />
        </MainLayout>
    );
};

export default SecuredRoute;
