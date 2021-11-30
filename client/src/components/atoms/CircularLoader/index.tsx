import clsx from 'clsx';

import CircularProgress from '@mui/material/CircularProgress';

import { colorTYPE, positionTYPE, useStyles } from './styles';

interface CircularLoaderI {
    overlay?: boolean;
    position?: positionTYPE;
    color?: colorTYPE;
    fixed?: boolean;
    size?: 'sm' | 'lg';
}

const CircularLoader: React.FC<CircularLoaderI> = ({
    size = 'sm',
    position = 'relative',
    color = 'primary'
}): JSX.Element => {
    const classes = useStyles({ position, color });

    const loaderClasses = clsx(
        classes.container,
        position !== 'relative' && classes.nonStatic,
        size === 'lg' && classes.progressLg
    );

    return (
        <div className={loaderClasses}>
            <CircularProgress className={clsx(classes.progress, size === 'lg' && classes.progressLg)} />
        </div>
    );
};

export default CircularLoader;
