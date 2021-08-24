import clsx from 'clsx';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import useStyles from './styles';

interface AppbarProps {
    isSidebarOpen: boolean;
}

const Appbar: React.FC<AppbarProps> = ({ isSidebarOpen }) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="inherit" className={clsx(classes.appBar, !isSidebarOpen && classes.appBarFull)}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h1" noWrap>
                    Some title
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
