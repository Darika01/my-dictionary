import React, {
    createContext,
    useContext,
    useReducer
} from 'react';

import { SnackbarVariantTYPE } from 'components/molecules/InfoSnackbar';

import { CLOSE_ALERT, OPEN_ALERT } from './actions';

export type globalContextStateTYPE = {
    alert: {
        open: boolean;
        variant: SnackbarVariantTYPE;
        message: string;
    };
};

export type globalContextTYPE = {
    contextState: globalContextStateTYPE;
    dispatchContext: React.Dispatch<ActionTYPE>;
};

type ActionTYPE = {
    [k: string]: any;
};

const initialState = {
    alert: {
        open: false,
        variant: '',
        message: ''
    }
};

const globalContext = createContext(initialState as globalContextStateTYPE);
const useGlobalContext = (): any => useContext(globalContext);

const { Provider }: any = globalContext;

const GlobalContextProvider: React.FC = ({ children }) => {
    const [contextState, dispatchContext] = useReducer((state: globalContextStateTYPE, action: ActionTYPE) => {
        switch (action.type) {
            case OPEN_ALERT:
                return {
                    ...state,
                    alert: {
                        open: true,
                        variant: action.variant,
                        message: action.message
                    }
                };
            case CLOSE_ALERT:
                return {
                    ...state,
                    alert: initialState.alert
                };
            default:
                return state;
        }
    }, initialState);

    return <Provider value={{ contextState, dispatchContext }}>{children}</Provider>;
};

export { GlobalContextProvider, useGlobalContext };
export default globalContext;
