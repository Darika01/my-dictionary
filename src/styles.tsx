import breakpoints from 'utils/themeConfig/breakpoints';

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    '@global': {
        body: {
            fontSize: '1rem',
            margin: 0,
            fontFamily:
                '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
        },
        '*': {
            boxShadow: 'none !important'
        },
        '.fieldContainer': {
            width: '100%',
            maxWidth: '24rem',
            '&:not(:last-child)': {
                marginRight: '2rem',
                [theme.breakpoints.down(breakpoints.md)]: {
                    marginBottom: '2rem',
                    marginRight: 0
                }
            }
        },
        '.formContainer': {
            display: 'flex',
            marginBottom: '4rem',
            [theme.breakpoints.down(breakpoints.md)]: {
                flexDirection: 'column'
            }
        },
        '.formContent': {
            display: 'flex',
            marginRight: '3.2rem',
            [theme.breakpoints.down(breakpoints.md)]: {
                marginBottom: '3.2rem',
                flexDirection: 'column',
                marginRight: 0
            }
        }
    }
}));
