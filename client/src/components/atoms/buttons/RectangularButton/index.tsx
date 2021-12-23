import ArrowTooltip from 'components/atoms/ArrowTooltip';

import { ButtonBaseProps, SvgIconProps } from '@mui/material';

import { ButtonProgress, ColorTYPE, StyledButton, VariantTYPE } from './styles';

interface RectangularButtonProps extends ButtonBaseProps {
    tooltipTitle?: string;
    color?: ColorTYPE;
    text: string;
    type?: 'button' | 'reset' | 'submit';
    variant?: VariantTYPE;
    size?: 'large' | 'medium' | 'small';
    disabled?: boolean;
    startIcon?: SvgIconProps;
    endIcon?: SvgIconProps;
    handleClick?: () => void;
    loading?: boolean;
    fullWidth?: boolean;
    component?: 'label' | 'button';
    htmlFor?: string;
}

const RectangularButton: React.FC<RectangularButtonProps> = ({
    tooltipTitle,
    handleClick,
    text,
    loading,
    variant = 'contained',
    size = 'large',
    color = 'primary',
    disabled = false,
    fullWidth = false,
    type = 'button',
    component = 'button',
    ...rest
}) => {
    return (
        <ArrowTooltip title={tooltipTitle ?? text} disabled={loading || disabled}>
            <StyledButton
                onClick={handleClick}
                variant={variant}
                color={color}
                size={size}
                fullWidth={fullWidth}
                type={type}
                component={component}
                disabled={loading || disabled}
                {...rest}
            >
                <>
                    {text}
                    {loading && <ButtonProgress size={size === 'small' ? '1.4rem' : '1.6rem'} color={color} />}
                </>
            </StyledButton>
        </ArrowTooltip>
    );
};

export default RectangularButton;
