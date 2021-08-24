import clsx from 'clsx';
import ArrowTooltip from 'components/atoms/ArrowTooltip';

import { Fab } from '@material-ui/core';

import { ColorTYPE, useStyles } from './styles';

interface RoundButtonProps {
    tooltipTitle?: string;
    color?: ColorTYPE;
    children: React.ReactChild;
    variant?: 'text';
    size?: 'large' | 'medium' | 'small';
    disabled?: boolean;
    handleClick?: (e: React.BaseSyntheticEvent) => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({
    handleClick,
    children,
    tooltipTitle = '',
    variant = 'text',
    color = 'primary',
    size = 'small',
    disabled = false,
    ...props
}) => {
    const classes = useStyles({ color });

    return (
        <div className={classes.btnContainer}>
            <ArrowTooltip title={tooltipTitle} disabled={disabled}>
                <Fab
                    className={clsx(classes[variant], classes[size])}
                    onClick={handleClick}
                    disabled={disabled}
                    aria-label={tooltipTitle}
                    type="button"
                    {...props}
                >
                    {children}
                </Fab>
            </ArrowTooltip>
        </div>
    );
};

export default RoundButton;
