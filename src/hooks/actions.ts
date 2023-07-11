import {useDispatch} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {kinopoiskActions} from '../store/kinopoisk/kinopoisk.slice';

const actions = {
    ...kinopoiskActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}