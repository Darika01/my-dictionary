import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    tableContainer: { maxHeight: 500 },
    noDataBody: {
        textAlign: 'right',
        padding: '4rem 0'
    }
}));

export default useStyles;
