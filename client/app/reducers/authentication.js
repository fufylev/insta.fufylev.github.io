import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, errorOccurred, isLoggedIn, isRegistered, clearReducer} from '~/actions/authentication';

const initialState = {
    user: '',
    isRegistered: false,
    isLoggedIn: false,
    loading: false,
};

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {...state, loading: true};
    },
    [dataReceived]: (state, action) => {
        return {
            ...state,
            user: action.payload,
            loading: false,
            error: '',
        };
    },
    [errorOccurred]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    [isRegistered]: (state, action) => {
        return {
            ...state,
            isRegistered: action.payload,
            errorOccurred: '',
        };
    },
    [isLoggedIn]: (state, action) => {
        return {
            ...state,
            isLoggedIn: action.payload,
            errorOccurred: '',
        };
    },
    [clearReducer]: (state, action) => {
        return {
            ...state,
            ...initialState,
        };
    },
}, initialState);