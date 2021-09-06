import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& > div': {
            display: 'flex',
            alignItems: 'center'
        }
    }
}));

export default useStyles;
