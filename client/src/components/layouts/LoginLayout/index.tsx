import { useEffect } from 'react';

import { CLOSE_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { useLocation } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import useStyles from './styles';

const LoginLayout: React.FC = ({ children }) => {
    const classes = useStyles();
    const location = useLocation();
    const { contextState, dispatchContext } = useGlobalContext();

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const onCloseAlert = () => {
        dispatchContext({ type: CLOSE_ALERT });
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                {/* <Toolbar /> */}
                {children}
                {/* {contextState.alert.open && (
                    <InfoSnackbar
                        variant={contextState.alert.variant}
                        message={contextState.alert.message}
                        onClose={onCloseAlert}
                    />
                )} */}
            </main>
        </div>
    );
};
export default LoginLayout;
