import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    noDataBody: {
        textAlign: 'center',
        padding: '4rem 0'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    visibilityOff: {
        textShadow: '0px 0px 1.2rem #4c4b4b',
        color: 'transparent'
    }
}));

export default useStyles;
