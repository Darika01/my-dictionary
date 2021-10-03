import getLighterColor from 'utils/getLighterColor';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export type colorTYPE = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'grey';

type StylesProps = {
    color: colorTYPE;
};

export const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        position: 'relative'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-0.8rem',
        marginLeft: '-0.8rem',
        color: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main)
    },
    contained: {
        color: theme.palette.common.white,
        backgroundColor: ({ color }: StylesProps) =>
            color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main,
        '&:hover': {
            backgroundColor: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].dark)
        },
        '&:active': {
            backgroundColor: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].light)
        }
    },
    outlined: {
        color: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main),
        borderColor: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main),
        '&:hover': {
            backgroundColor: ({ color }) =>
                getLighterColor(color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main, 0.08),
            borderColor: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main)
        },
        '&:active': {
            backgroundColor: ({ color }) =>
                getLighterColor(color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main, 0.15),
            borderColor: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main)
        }
    },

    text: {
        color: ({ color }) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main),
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: ({ color }) =>
                getLighterColor(color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main, 0.08)
        },
        '&:active': {
            backgroundColor: ({ color }) =>
                getLighterColor(color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main, 0.15)
        }
    }
}));
