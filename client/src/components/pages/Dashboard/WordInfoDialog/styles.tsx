import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    wordDef: {
        marginTop: '2rem'
    },
    wordDefContainer: {
        '&:not(:last-child)': { marginBottom: '4rem' }
    },
    googleWordDef: {
        display: 'flex',
        marginTop: '3.2rem'
    },
    avatar: {
        marginRight: '3.2rem',
        width: '2rem',
        height: '2rem',
        backgroundColor: 'transparent',
        border: `0.1rem solid ${theme.palette.grey[400]}`,
        color: theme.palette.text.secondary
    },
    googleDefSingleInfo: {
        display: 'flex',
        flexDirection: 'column',
        '& > div': { marginTop: '2rem' }
    }
}));

export default useStyles;
