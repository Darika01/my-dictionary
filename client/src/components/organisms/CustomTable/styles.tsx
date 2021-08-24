import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    noDataBody: {
        textAlign: 'center',
        padding: '4rem 0'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default useStyles;