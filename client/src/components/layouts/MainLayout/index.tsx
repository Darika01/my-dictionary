import { useEffect, useState } from 'react';

import InfoSnackbar from 'components/molecules/InfoSnackbar';
import Appbar from 'components/organisms/Appbar';
import Sidebar from 'components/organisms/Sidebar';
import { CLOSE_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { useLocation } from 'react-router-dom';
import { logoutUser } from 'utils/authService';
import breakpoints from 'utils/themeConfig/breakpoints';

import { CssBaseline, Theme, Toolbar, useMediaQuery } from '@mui/material';

import useStyles from './styles';

const MainLayout: React.FC = ({ children }) => {
    const classes = useStyles();
    const location = useLocation();
    const matchesDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoints.sm));
    const { contextState, dispatchContext } = useGlobalContext();

    const isSidebarOpen = localStorage.getItem('isSidebarOpen');
    const [IsSidebarOpen, setIsSidebarOpen] = useState<string>('true');

    useEffect(() => {
        const isOpen = matchesDownSM ? 'false' : isSidebarOpen ?? 'true';
        setIsSidebarOpen(isOpen);
        localStorage.setItem('isSidebarOpen', isOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchesDownSM]);

    const handleDrawer = (open: boolean) => {
        const isOpen = JSON.stringify(open);
        setIsSidebarOpen(isOpen);
        localStorage.setItem('isSidebarOpen', isOpen);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        const unloadCallback = (event: any) => logoutUser();
        window.addEventListener('beforeunload', unloadCallback);
        return () => window.removeEventListener('beforeunload', unloadCallback);
    }, []);

    const onCloseAlert = () => {
        dispatchContext({ type: CLOSE_ALERT });
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Sidebar
                isSidebarOpen={IsSidebarOpen === 'true'}
                matchesDownSM={matchesDownSM}
                handleDrawer={handleDrawer}
            />
            <Appbar isSidebarOpen={IsSidebarOpen === 'true'} />

            <main className={classes.content}>
                <Toolbar />
                {children}
                {contextState.alert.open && (
                    <InfoSnackbar
                        variant={contextState.alert.variant}
                        message={contextState.alert.message}
                        onClose={onCloseAlert}
                    />
                )}
            </main>
        </div>
    );
};
export default MainLayout;
