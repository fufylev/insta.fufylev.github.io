import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, picturesToStore } from '~/actions/pictures';

const initialState = {
    pictures: {},
    loading: false,
};

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {...state, loading: true};
    },
    [dataReceived]: (state, action) => {
        return {
            ...state,
            pictures: action.payload,
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