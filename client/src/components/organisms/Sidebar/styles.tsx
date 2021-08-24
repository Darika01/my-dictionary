import { makeStyles } from '@material-ui/core';

export const drawerWidth = '24rem';
export const drawerWidthCollapsed = '7.2rem';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: theme.palette.common.white
    },
    drawerPaper: {
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        borderRight: `.1rem solid ${theme.palette.grey[100]}`
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: drawerWidthCollapsed
    },
    drawerContainer: {
        overflowX: 'hidden'
    },
    divider: {
        borderTop: `.1rem solid ${theme.palette.grey[100]}`
    },
    collapseIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 .8rem',
        marginBottom: '1.6rem'
    }
}));

export default useStyles;
