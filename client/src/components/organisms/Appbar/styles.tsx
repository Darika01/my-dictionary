import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { drawerWidth, drawerWidthCollapsed } from '../Sidebar/styles';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: `calc(${drawerWidth})`,
        borderBottom: `.1rem solid ${theme.palette.grey[100]}`,
        borderRadius: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    appBarFull: {
        width: `calc(100% - ${drawerWidthCollapsed})`,
        marginLeft: `calc(${drawerWidthCollapsed})`
    },
    toolbar: {
        maxWidth: '128rem',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default useStyles;
