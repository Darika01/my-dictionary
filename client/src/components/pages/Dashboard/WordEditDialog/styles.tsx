import breakpoints from 'utils/themeConfig/breakpoints';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        minHeight: 'calc(100vh - 6.4rem - 6rem - 6.4rem - 1.6rem)',
        justifyContent: 'space-between',
        padding: '3.2rem 2.4rem',
        '& > div:first-child': {
            display: 'flex',
            // marginBottom: '2rem',
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
        },
        '& .fieldContainer': {
            marginBottom: '2rem'
        }
    }
}));

export default useStyles;
