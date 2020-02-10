import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, saveUser } from '~/actions/users';

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