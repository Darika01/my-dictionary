import getLighterColor from 'utils/getLighterColor';
import { ColorTYPE } from 'utils/types';

import { Fab } from '@mui/material';
import { styled } from '@mui/system';

import { Sizes, Variants } from './';

type StylesProps = {
    color: ColorTYPE;
    variant: Variants;
    size: Sizes;
};

export const BtnContainer = styled('div')(() => {
    return {
        display: 'flex'
    };
});

export const StyledFab = styled(Fab)(({ theme }): any => ({ variant, size, color }: StylesProps) => {
    let sizeStyles = {};
    let variantStyles = {};

    switch (size) {
        case 'small':
            sizeStyles = {
                padding: '1.1rem',
                width: '3.2rem',
                height: '3.2rem',
                '& > svg': {
                    fontSize: '1.6rem'
                }
            };
            break;
        case 'large':
            sizeStyles = {
                padding: '1.4rem',
                width: '4.8rem',
                height: '4.8rem',
                '& > svg': {
                    fontSize: '2rem'
                }
            };
            break;

        case 'medium':
        default:
            sizeStyles = {
                padding: '1.4rem',
                width: '4.2rem',
                height: '4.2rem',
                '& > svg': {
                    fontSize: '1.8rem'
                }
            };
            break;
    }

    if (variant === 'text') {
        variantStyles = {
            color: color === 'grey' ? theme.palette.grey[600] : theme.palette[color].main,
            backgroundColor: 'inherit',
            '&.Mui-disabled': {
                backgroundColor: 'inherit'
            },
            '&:hover': {
                backgroundColor: getLighterColor(
                    color === 'grey' ? theme.palette.grey[600] : theme.palette[color].main,
                    0.08
                )
            },
            '&:active': {
                backgroundColor: getLighterColor(
                    color === 'grey' ? theme.palette.grey[600] : theme.palette[color].main,
                    0.15
                )
            }
        };
    }

    return {
        ...variantStyles,
        ...sizeStyles
    };
}) as any;
