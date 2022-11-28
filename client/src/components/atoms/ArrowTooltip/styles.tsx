import { Popper } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPopper = styled(Popper)(({ theme }) => ({
    '& .MuiTooltip-tooltipArrow': {
        backgroundColor: theme.palette.grey[100],
        border: `.1rem solid ${theme.palette.grey[500]}`,
        color: theme.palette.text.primary,
        ...theme.typography.caption,
        position: 'relative',
        padding: '.2rem .4rem'
    },
    '& .MuiTooltip-arrow': {
        '&::before': {
            backgroundColor: theme.palette.grey[100],
            border: `.1rem solid ${theme.palette.grey[500]}`
        }
    }
}));
