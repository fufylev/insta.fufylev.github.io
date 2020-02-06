import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, picturesToStore, clearStore } from '~/actions/pictures';

const initialState = {
    pictures: [],
    loading: false,
};

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {
            ...state,
            loading: true
        };
    },
    [clearStore]: (state) => {
        return {
            ...state,
            ...initialState
        };
    },
    [dataReceived]: (state) => {
        return {
            ...state,
            loading: false,
        };
    },
    [picturesToStore]: (state, action) => {
        const pics = action.payload;
        const picArray = Object.keys(pics).map(key => pics[key]);

        return {
            ...state,
            pictures: state.pictures.concat(picArray),
        };
    },
}, initialState);