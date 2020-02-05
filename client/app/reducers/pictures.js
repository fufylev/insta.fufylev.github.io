import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, picturesToStore, clearStore } from '~/actions/pictures';

const initialState = {
    pictures: {},
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
        return {
            ...state,
            pictures: {
                ...state.pictures,
                ...action.payload,
            },
        };
    },
}, initialState);