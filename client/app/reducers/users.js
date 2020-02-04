import { handleActions } from 'redux-actions';

import { loadStart, dataReceived } from '~/actions/users';

const initialState = {
    users: {},
    loading: false,
};

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {...state, loading: true};
    },
    [dataReceived]: (state, action) => {
        return {
            ...state,
            users: action.payload,
            loading: false,
        };
    },
}, initialState);