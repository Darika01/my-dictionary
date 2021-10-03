import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    }
}));
