import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    selectFieldContainer: {
        '& .MuiFormControl-root': {
            minWidth: '16rem'
        }
    }
}));

export default useStyles;
