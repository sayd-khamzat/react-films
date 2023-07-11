import {configureStore} from '@reduxjs/toolkit';
import {kinopoiskApi} from './kinopoisk/kinopoisk.api';
import {setupListeners} from '@reduxjs/toolkit/query';
import {kinopoiskReducer} from './kinopoisk/kinopoisk.slice';

export const store = configureStore({
    reducer: {
        [kinopoiskApi.reducerPath]: kinopoiskApi.reducer, //ключ и значение
        kinopoisk: kinopoiskReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware)
})

setupListeners(store.dispatch) // для refetchOnFocus

export type RootState = ReturnType<typeof store.getState> // типизация state