import {configureStore} from '@reduxjs/toolkit';
import {kinopoiskApi} from './kinopoisk/kinopoisk.api';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [kinopoiskApi.reducerPath]: kinopoiskApi.reducer //ключ и значение
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware)
})

setupListeners(store.dispatch) // для refetchOnFocus