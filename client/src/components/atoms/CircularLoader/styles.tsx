import { ColorTYPE } from 'utils/types';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';

export type positionTYPE = 'relative' | 'absolute' | 'fixed';
export type colorTYPE = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'grey';

type StylesProps = {
    position: positionTYPE;
    color: colorTYPE;
};

export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '100%',
        textAlign: 'center',
        position: ({ position }: StylesProps) => position
    },
    progress: {
        color: ({ color }: StylesProps) => (color === 'grey' ? theme.palette.grey[500] : theme.palette[color].main),
        padding: '.8rem',
        width: '4rem !important',
        height: '4rem !important'
    },
    nonStatic: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    },
    progressLg: {
        width: '6rem !important',
        height: '6rem !important'
    }
}));

type ContainerStylesProps = {
    fixed?: boolean;
    overlay?: boolean;
    relative?: boolean;
    color?: ColorTYPE;
};

export const LoaderContainer = styled('div', {
    shouldForwardProp: prop => prop !== 'fixed' && prop !== 'overlay' && prop !== 'relative'
})(({ theme }): any => ({ fixed, overlay, relative, color }: ContainerStylesProps) => {
    let nonStaticStyles = {};
    let fixedStyles = {};
    let overlayStyles = {};
    let relativeStyles = {};

    if (fixed || overlay) {
        nonStaticStyles = {
            display: 'flex',
            backgroundColor: theme.palette.grey[100],
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
        };
    }

    if (relative) {
        relativeStyles = { width: 'unset', position: 'static' };
    }

    if (fixed) {
        fixedStyles = { position: 'fixed' };
    }

    if (overlay) {
        overlayStyles = { position: 'absolute' };
    }

    return {
        // color: theme.palette.grey[400],
        width: '100%',
        textAlign: 'center',
        ...nonStaticStyles,
        ...fixedStyles,
        ...overlayStyles,
        ...relativeStyles
    };
}) as any;
