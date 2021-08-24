import { Tooltip, TooltipProps } from '@material-ui/core';

import { useStyles } from './styles';

interface ArrowTooltipProps extends TooltipProps {
    title: string;
    disabled?: boolean;
}

const ArrowTooltip: React.FC<ArrowTooltipProps> = ({ children, title, disabled, ...props }) => {
    const classes = useStyles();
    return title && !disabled ? (
        <Tooltip
            {...props}
            title={title}
            classes={classes}
            arrow
            placement="top"
            enterDelay={300}
            leaveDelay={100}
            TransitionProps={{
                timeout: {
                    enter: 300,
                    exit: 150
                }
            }}
        >
            {children}
        </Tooltip>
    ) : (
        <span>{children}</span>
    );
};

export default ArrowTooltip;
