import clsx from 'clsx';

import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

interface CircularLoaderI extends CircularProgressProps {
    overlay?: boolean;
    fixed?: boolean;
    className?: string;
    size?: number;
}

const CircularLoader: React.FC<CircularLoaderI> = ({ overlay, fixed, className, size }): JSX.Element => {
    const classes = useStyles();

    const loaderClasses = clsx(
        classes.container,
        fixed || overlay ? classes.nonStatic : null,
        fixed ? classes.fixed : null,
        overlay ? classes.overlay : null,
        className
    );

    return (
        <div className={loaderClasses}>
            <CircularProgress size={size} className={classes.progress} color="primary" />
        </div>
    );
};

export default CircularLoader;
