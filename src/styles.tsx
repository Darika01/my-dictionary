import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    '@global': {
        body: {
            fontSize: '1rem',
            margin: 0,
            fontFamily:
                '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
        }
    }
}));
