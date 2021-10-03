import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.grey[100],
        border: `0.1rem solid ${theme.palette.grey[500]}`,
        color: theme.palette.text.primary,
        ...theme.typography.caption,
        position: 'relative',
        padding: '0.2rem 0.4rem'
    },
    arrow: {
        '&::before': {
            backgroundColor: theme.palette.grey[100],
            border: `0.1rem solid ${theme.palette.grey[500]}`
        }
    }
}));
