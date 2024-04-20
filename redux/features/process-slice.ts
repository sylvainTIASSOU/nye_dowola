import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type InitialState = {
    value: ProcessState
}
type ProcessState = {
    inProcessing: boolean,
}

const initialState = {
    value: {
        inProcessing: false,
    } as ProcessState
} as  InitialState

const persistConfig = {
    key: 'root',
    storage,
};

export const process = createSlice({
    name: "process",
    initialState,
    reducers: {
        desactivateProcess: () => {
            return initialState;
        },

        activateProcess: (state, action: PayloadAction<boolean>) => {
            return {
                value: {
                    inProcessing: action.payload,
                }
            }
        }
    }
})


// Wrapping the reducer with persistReducer
const processReducer = persistReducer(persistConfig, process.reducer);

export const { activateProcess, desactivateProcess } = process.actions
export default processReducer;

