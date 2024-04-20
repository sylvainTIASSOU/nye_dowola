import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import cartSlice from "@/redux/features/cart-slice";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import activationReducer from "@/redux/features/activation_slice";
import processReducer from "@/redux/features/process-slice"; // defaults to localStorage for web

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartSlice,
    activation: activationReducer,
    process: processReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer : {
        authReducer,
        cartSlice,
        activationReducer,
        processReducer,
    }
})
// Créer le persisteur Redux
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
