import ArrowTooltip from 'components/atoms/ArrowTooltip';
import { ColorTYPE } from 'utils/types';

import { StyledFab } from './styles';

export type Sizes = 'large' | 'medium' | 'small';
export type Variants = 'text';
interface RoundButtonProps {
    tooltipTitle?: string;
    color?: ColorTYPE;
    children: React.ReactChild;
    variant?: Variants;
    size?: Sizes;
    disabled?: boolean;
    handleClick?: (e: React.BaseSyntheticEvent) => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({
    handleClick,
    children,
    tooltipTitle = '',
    variant = 'text',
    color = 'primary',
    size = 'medium',
    disabled = false,
    ...props
}) => {
    return (
        <ArrowTooltip title={tooltipTitle} disabled={disabled}>
            <StyledFab
                variant={variant}
                size={size}
                color={color}
                onClick={handleClick}
                disabled={disabled}
                aria-label={tooltipTitle}
                type="button"
                {...props}
            >
                {children}
            </StyledFab>
        </ArrowTooltip>
    );
};

export default RoundButton;
