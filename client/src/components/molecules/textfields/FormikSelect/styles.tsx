import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    selectFieldContainer: {
        '& .MuiFormControl-root': {
            minWidth: '16rem'
        }
    }
}));

export default useStyles;
