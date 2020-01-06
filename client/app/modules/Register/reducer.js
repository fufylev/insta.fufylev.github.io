import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, errorOccurred,
    mobileOrEmailInput, fullNameInput, userNameInput,
    passwordInput} from './actions';

const initialState = {
    mobileOrEmail: '',
    mobile: '',
    email: '',
    fullName: '',
    userName: '',
    password: '',
    avatar: '',
    bio: '',
    errorRegister: '',
    isRegistered: false,
    loading: false,
};

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {...state, loading: true};
    },
    [dataReceived]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            isRegistered: data.result === 'success',
            errorRegister: data.result !== 'success' ? data.result : '',
            loading: false,
        };
    },
    [errorOccurred]: (state, action) => {
        return {
            ...state,
            loading: false,
            errorRegister: action.payload.message,
        };
    },
    [mobileOrEmailInput]: (state, action) => {
        return {
            ...state,
            mobileOrEmail: action.payload,
        };
    },
    [fullNameInput]: (state, action) => {
        return {
            ...state,
            fullName: action.payload,
        };
    },
    [userNameInput]: (state, action) => {
        return {
            ...state,
            userName: action.payload,
        };
    },
    [passwordInput]: (state, action) => {
        return {
            ...state,
            password: action.payload,
        };
    },
}, initialState);