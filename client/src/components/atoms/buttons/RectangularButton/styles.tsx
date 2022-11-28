import { Button, CircularProgress } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/system';

export type ColorTYPE = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export type VariantTYPE = 'text' | 'outlined' | 'contained';

type StylesProps = {
    color: ColorTYPE;
    variant: VariantTYPE;
    theme: Theme;
};

export const ButtonProgress = styled(CircularProgress)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-.8rem',
    marginLeft: '-.8rem'
});

export const StyledButton = styled(Button)(({ theme }): any => ({ color, variant }: StylesProps) => {
    if (variant === 'contained')
        return {
            color: theme.palette.common.white,
            backgroundColor: theme.palette[color].main,
            '&:hover': {
                backgroundColor: theme.palette[color].dark
            },
            '&:active': {
                backgroundColor: theme.palette[color].light
            }
        };
    if (variant === 'outlined')
        return {
            color: theme.palette[color].main,
            borderColor: theme.palette[color].main,
            '&:hover': {
                backgroundColor: theme.palette[color].hover,
                borderColor: theme.palette[color].main
            },
            '&:active': {
                backgroundColor: theme.palette[color].active,
                borderColor: theme.palette[color].main
            }
        };
    if (variant === 'text')
        return {
            color: theme.palette[color].main,
            backgroundColor: theme.palette.common.white,
            '&:hover': {
                backgroundColor: theme.palette[color].hover
            },
            '&:active': {
                backgroundColor: theme.palette[color].active
            }
        };
}) as typeof Button;
