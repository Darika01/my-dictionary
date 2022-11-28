import getLighterColor from 'utils/getLighterColor';

import { PaletteOptions } from '@mui/material';

import {
    colorBackgroundLight,
    colorBackgroundMain,
    colorBorderDark,
    colorBorderLight,
    colorBorderMain,
    colorErrorMain,
    colorInfoMain,
    colorPrimaryMain,
    colorSecondaryMain,
    colorSuccessMain,
    colorWarningMain
} from './colors';

const palette: PaletteOptions = {
    mode: 'light',
    background: {
        default: colorBackgroundMain,
        paper: colorBackgroundLight
    },
    primary: {
        main: colorPrimaryMain,
        hover: getLighterColor(colorPrimaryMain, 0.08),
        active: getLighterColor(colorPrimaryMain, 0.15)
    },
    secondary: {
        main: colorSecondaryMain,
        hover: getLighterColor(colorPrimaryMain, 0.08),
        active: getLighterColor(colorPrimaryMain, 0.15)
    },
    success: {
        main: colorSuccessMain,
        hover: getLighterColor(colorSuccessMain, 0.08),
        active: getLighterColor(colorSuccessMain, 0.15)
    },
    info: {
        main: colorInfoMain,
        hover: getLighterColor(colorInfoMain, 0.08),
        active: getLighterColor(colorInfoMain, 0.15)
    },
    error: {
        main: colorErrorMain,
        hover: getLighterColor(colorPrimaryMain, 0.08),
        active: getLighterColor(colorPrimaryMain, 0.15)
    },
    warning: {
        main: colorWarningMain,
        hover: getLighterColor(colorPrimaryMain, 0.08),
        active: getLighterColor(colorPrimaryMain, 0.15)
    },
    border: {
        light: colorBorderLight,
        main: colorBorderMain,
        dark: colorBorderDark
    }
};
export default palette;
