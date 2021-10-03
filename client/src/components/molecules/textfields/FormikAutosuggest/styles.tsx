import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    autosuggest: {
        minWidth: '100px'
    },
    errNotification: {
        color: theme.palette.grey[500]
    },
    paper: {
        margin: 0,
        padding: 0
    },
    option: {
        minHeight: 'auto',
        alignItems: 'flex-start',
        padding: theme.spacing(1),
        '&[aria-selected="true"]': {
            backgroundColor: theme.palette.action.selected
        },
        '&[data-focus="true"]:not([aria-selected="true"])': {
            backgroundColor: theme.palette.action.hover
        }
    }
}));

export default useStyles;
