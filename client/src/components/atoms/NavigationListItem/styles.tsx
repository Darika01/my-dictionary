import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    navLink: {
        color: theme.palette.grey[700],
        textDecoration: 'none'
    },
    activeNavLink: {
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root, .MuiListItemText': {
            color: theme.palette.primary.main
        }
    },
    listItem: {
        paddingLeft: '2.6rem !important',
        paddingRight: '2.4rem !important',
        '& .MuiSvgIcon-root': {
            width: '1.6rem',
            height: 'auto'
        }
    }
}));
