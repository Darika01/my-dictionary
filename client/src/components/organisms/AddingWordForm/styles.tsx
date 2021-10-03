import breakpoints from 'utils/themeConfig/breakpoints';

import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
    form: {
        '&:first-child': {
            marginRight: '2rem',
            [theme.breakpoints.down(breakpoints.md)]: {
                marginRight: 0,
                marginBottom: '3.2rem'
            }
        },
        '& > div:first-child': {
            display: 'flex',
            marginBottom: '2rem',
            [theme.breakpoints.down(breakpoints.md)]: {
                flexDirection: 'column'
            },
            '& > div:not(:last-child)': {
                marginRight: '2rem',
                [theme.breakpoints.down(breakpoints.md)]: {
                    marginBottom: '2rem',
                    marginRight: 0
                }
            }
        }
    }
}));

export default useStyles;
