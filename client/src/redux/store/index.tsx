import rootReducer from 'redux/reducers';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
export interface RootState {
    alert: {
        variant: AlertVariantTYPE;
        message: 'string';
    };
}
export type AppDispatch = typeof store.dispatch;

export type AlertVariantTYPE = 'error' | 'success' | 'warning' | 'info';
