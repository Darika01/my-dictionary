import getLighterColor from 'utils/getLighterColor';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export type ColorTYPE = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'grey';

type StylesProps = {
    color: ColorTYPE;
};

export const useStyles = makeStyles((theme: Theme) => ({
    btnContainer: {
        display: 'flex'
    },

    text: {
        color: ({ color }: StylesProps) => (color === 'grey' ? theme.palette.grey[300] : theme.palette[color].main),
        backgroundColor: 'inherit',
        '&.Mui-disabled': {
            backgroundColor: 'inherit'
        },
        '&:hover': {
            backgroundColor: ({ color }) =>
                getLighterColor(color === 'grey' ? theme.palette.grey[300] : theme.palette[color].main, 0.08)
        },
        '&:active': {
            backgroundColor: ({ color }) =>
                getLighterColor(color === 'grey' ? theme.palette.grey[300] : theme.palette[color].main, 0.15)
        }
    },
    small: {
        padding: '1.1rem',
        '& .MuiSvgIcon-root': {
            fontSize: '1.4rem'
        }
    },
    medium: {
        padding: '1.4rem',
        '& .MuiSvgIcon-root': {
            fontSize: '1.8rem'
        }
    },
    large: {
        padding: '1.4rem',
        '& .MuiSvgIcon-root': {
            fontSize: '2.4rem'
        }
    }
}));
