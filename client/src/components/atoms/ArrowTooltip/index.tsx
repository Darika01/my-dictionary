import { Tooltip, TooltipProps } from '@mui/material';

import { StyledPopper } from './styles';

interface ArrowTooltipProps extends TooltipProps {
    title: string;
    disabled?: boolean;
}

const ArrowTooltip: React.FC<ArrowTooltipProps> = ({ children, title, disabled }) => {
    return title && !disabled ? (
        <Tooltip
            title={title}
            arrow
            PopperComponent={StyledPopper}
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
