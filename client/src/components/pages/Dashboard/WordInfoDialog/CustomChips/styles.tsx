import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    chipLink: {
        '&:not(:last-child)': { marginRight: '.8rem' }
    },
    chip: {
        cursor: 'pointer',
        marginTop: '.8rem'
    }
}));

export default useStyles;
