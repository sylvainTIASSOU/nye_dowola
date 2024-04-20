import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type InitialState = {
    value: ActivationState
}
type ActivationState = {
    isActive: boolean,
}

const initialState = {
    value: {
        isActive: false,
    } as ActivationState
} as  InitialState

const persistConfig = {
    key: 'root',
    storage,
};

export const activation = createSlice({
    name: "activation",
    initialState,
    reducers: {
        desactivate: () => {
            return initialState;
        },

        activate: (state, action: PayloadAction<boolean>) => {
            return {
                value: {
                    isActive: action.payload,
                }
            }
        }
    }
})


// Wrapping the reducer with persistReducer
const activationReducer = persistReducer(persistConfig, activation.reducer);

export const { activate, desactivate } = activation.actions
export default activationReducer;

