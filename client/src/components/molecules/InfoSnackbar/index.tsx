import { useState } from 'react';

import RoundButton from 'components/atoms/buttons/RoundButton';

import Snackbar from '@material-ui/core/Snackbar';
import Close from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

export type SnackbarVariantTYPE = 'error' | 'info' | 'success' | 'warning';

interface InfoSnackbarProps {
    title: string;
    variant: SnackbarVariantTYPE;
    onClose: () => void;
}
const InfoSnackbar: React.FC<InfoSnackbarProps> = ({ title, variant, onClose }) => {
    const [Open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={Open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={
                    <>
                        <RoundButton color="secondary" size="small" handleClick={handleClose}>
                            <Close />
                        </RoundButton>
                    </>
                }
            >
                <Alert onClose={handleClose} severity={variant}>
                    {title}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default InfoSnackbar;
