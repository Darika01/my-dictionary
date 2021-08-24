import ArrowTooltip from 'components/atoms/ArrowTooltip';

import { Button, ButtonBaseProps, CircularProgress, SvgIconProps } from '@material-ui/core';

import { useStyles } from './styles';

interface RectangularButtonProps extends ButtonBaseProps {
    tooltipTitle?: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    text: string;
    type?: 'button' | 'reset' | 'submit';
    variant?: 'text' | 'outlined' | 'contained';
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
    const classes = useStyles({ color });

    return (
        <ArrowTooltip title={tooltipTitle ?? text} disabled={loading || disabled}>
            <Button
                className={classes[variant]}
                onClick={handleClick}
                variant={variant}
                size={size}
                fullWidth={fullWidth}
                type={type}
                component={component}
                disabled={loading || disabled}
                {...rest}
            >
                <>
                    {text}
                    {loading && <CircularProgress size="1.6rem" className={classes.buttonProgress} />}
                </>
            </Button>
        </ArrowTooltip>
    );
};

export default RectangularButton;
