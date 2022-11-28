import { Backdrop } from '@mui/material';
import { styled } from '@mui/system';

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1
}));
