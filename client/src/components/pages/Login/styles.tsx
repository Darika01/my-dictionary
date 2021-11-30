import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        marginTop: '50%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

        '& .fieldContainer': {
            marginBottom: '1rem',
            '&:last-child': {
                marginBottom: '3rem'
            }
        }
    }
}));
export default useStyles;
