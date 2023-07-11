import {ISingleMovie} from '../../models/models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface KinopoiskState {
    singleMovie: ISingleMovie | undefined
}

const initialState: KinopoiskState = {
    singleMovie: undefined
}

export const kinopoiskSlice = createSlice({
    name: 'kinopoisk',
    initialState: initialState, // можно просто initialState, так как название ключа и значения одинаковы
    reducers: {
        addMovie(state, action: PayloadAction<ISingleMovie | undefined>) {
            state.singleMovie = action.payload
        }
    }
})

export const kinopoiskActions = kinopoiskSlice.actions
export const kinopoiskReducer = kinopoiskSlice.reducer