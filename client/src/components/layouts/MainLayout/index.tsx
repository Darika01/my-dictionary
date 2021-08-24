import { useEffect, useState } from 'react';

import Appbar from 'components/organisms/Appbar';
import Sidebar from 'components/organisms/Sidebar';
import { useLocation } from 'react-router-dom';
import breakpoints from 'utils/themeConfig/breakpoints';

import { CssBaseline, Theme, Toolbar, useMediaQuery } from '@material-ui/core';

import useStyles from './styles';

const MainLayout: React.FC = ({ children }) => {
    const classes = useStyles();
    const location = useLocation();
    const matchesDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoints.sm));

    const isSidebarOpen = sessionStorage.getItem('isSidebarOpen');
    const [IsSidebarOpen, setIsSidebarOpen] = useState<string>('true');

    useEffect(() => {
        const isOpen = matchesDownSM ? 'false' : isSidebarOpen ?? 'true';
        setIsSidebarOpen(isOpen);
        sessionStorage.setItem('isSidebarOpen', isOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchesDownSM]);

    const handleDrawer = (open: boolean) => {
        const isOpen = JSON.stringify(open);
        setIsSidebarOpen(isOpen);
        sessionStorage.setItem('isSidebarOpen', isOpen);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

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
            </main>
        </div>
    );
};
export default MainLayout;
