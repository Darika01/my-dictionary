import RoundButton from 'components/atoms/buttons/RoundButton';

import { Close } from '@mui/icons-material';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

export type SnackbarVariantTYPE = 'error' | 'info' | 'success' | 'warning';

export type SnackbarTYPE = {
    message: string;
    variant: SnackbarVariantTYPE;
};

interface InfoSnackbarProps extends SnackbarTYPE {
    onClose: () => void;
}
const InfoSnackbar: React.FC<InfoSnackbarProps> = ({ message, variant, onClose }) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={true}
                autoHideDuration={6000}
                onClose={onClose}
                action={
                    <>
                        <RoundButton color="secondary" size="small" handleClick={onClose}>
                            <Close />
                        </RoundButton>
                    </>
                }
            >
                <Alert onClose={onClose} severity={variant}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default InfoSnackbar;
