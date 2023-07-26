import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface KinopoiskState {
    movieId: number | null
}

const initialState: KinopoiskState = {
    movieId: null
}

export const kinopoiskSlice = createSlice({
    name: 'kinopoisk',
    initialState: initialState, // можно просто initialState, так как название ключа и значения одинаковы
    reducers: {
        addMovieId(state, action: PayloadAction<number | null>) {
            state.movieId = action.payload
        }
    }
})

export const kinopoiskActions = kinopoiskSlice.actions
export const kinopoiskReducer = kinopoiskSlice.reducer