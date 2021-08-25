import { makeStyles, Theme } from '@material-ui/core/styles';

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
