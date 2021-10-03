import breakpoints from 'utils/themeConfig/breakpoints';

import { makeStyles } from '@mui/styles';

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
            [theme.breakpoints.down(breakpoints.sm)]: {
                '& .MuiFormControl-root': {
                    width: '100%'
                }
            }
        },
        '.formContainer': {
            display: 'flex',
            marginBottom: '4rem',
            [theme.breakpoints.down(breakpoints.md)]: {
                flexDirection: 'column'
            }
        }
    }
}));
