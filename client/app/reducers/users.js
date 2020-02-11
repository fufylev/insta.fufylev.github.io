import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, saveUser, clearStore } from '~/actions/users';

const initialState = {
    currentUser: {},
    users: {},
    loading: false,
    userSetUp: false
};

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {...state, loading: true};
    },
    [clearStore]: (state) => {
        return {
            ...state,
            ...initialState
        };
    },
    [dataReceived]: (state, action) => {
        return {
            ...state,
            userSetUp: action.payload,
            loading: false,
        };
    },
    [saveUser]: (state, action) => {
        return {
            ...state,
            currentUser: action.payload,
        };
    },
}, initialState);