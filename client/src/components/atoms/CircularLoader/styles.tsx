import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '100%',
        textAlign: 'center'
    },
    progress: {
        color: theme.palette.grey[400],
        padding: theme.spacing(1)
    },
    overlay: {
        position: 'absolute'
    },
    fixed: {
        position: 'fixed'
    },
    nonStatic: {
        display: 'flex',
        backgroundColor: theme.palette.grey[100],
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    }
}));
