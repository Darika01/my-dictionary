import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: '2rem 1.6rem',
        maxWidth: '40rem',
        margin: '0 auto',
        overflowX: 'auto'
    }
}));

export default useStyles;
