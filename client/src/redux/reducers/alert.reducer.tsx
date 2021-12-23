import initialData from 'redux/store/initialData';

import { alertConstants } from '../constants';

export function alert(state = initialData.alert, action: any) {
    switch (action.type) {
        case alertConstants.OPEN:
            return {
                variant: action.variant,
                message: action.message
            };
        case alertConstants.CLOSE:
            return initialData.alert;
        default:
            return state;
    }
}
