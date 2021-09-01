import RoundButton from 'components/atoms/buttons/RoundButton';

import { DialogTitle } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import useStyles from './styles';

interface CustomDialogTitleProps {
    onCloseDialog?: () => void;
}
const CustomDialogTitle: React.FC<CustomDialogTitleProps> = ({ children, onCloseDialog }) => {
    const classes = useStyles();
    return (
        <DialogTitle disableTypography className={classes.title}>
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
