import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: '2rem 1.6rem',
        maxWidth: '128rem',
        margin: '0 auto',
        overflowX: 'auto'
    }
}));

export default useStyles;
