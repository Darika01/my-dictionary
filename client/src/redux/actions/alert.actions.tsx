import { AlertVariantTYPE } from 'redux/store';

import { alertConstants } from '../constants';

export const alertActions = {
    open,
    close
};

function open(variant: AlertVariantTYPE, message: string) {
    return { type: alertConstants.OPEN, variant, message };
}

function close() {
    return { type: alertConstants.CLOSE };
}
