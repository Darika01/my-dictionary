import RoundButton from 'components/atoms/buttons/RoundButton';

import { Close } from '@mui/icons-material';
import { DialogTitle } from '@mui/material';

import useStyles from './styles';

interface CustomDialogTitleProps {
    onCloseDialog?: () => void;
}
const CustomDialogTitle: React.FC<CustomDialogTitleProps> = ({ children, onCloseDialog }) => {
    const classes = useStyles();
    return (
        <DialogTitle className={classes.title}>
            {/* <DialogTitle disableTypography className={classes.title}> */}
            {children}
            {typeof onCloseDialog === 'function' && (
                <RoundButton handleClick={onCloseDialog} tooltipTitle="Close">
                    <Close />
                </RoundButton>
            )}
        </DialogTitle>
    );
};
export default CustomDialogTitle;
