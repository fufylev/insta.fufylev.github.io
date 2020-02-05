import { createAction } from 'redux-actions';
import { fire } from '~/libs/api/API';

export const loadStart = createAction('[Authentication] Load start');
export const dataReceived = createAction('[Authentication] Data received');
export const isLoggedIn = createAction('[Authentication] User is logged in');
export const isRegistered = createAction('[Authentication] User is registered');
export const errorOccurred = createAction('[Error Occurred] Error occurred');
export const clearReducer = createAction('[Clean Reducer] Clean reducer');

export const register = ({ email, password }) => (dispatch) => {
    dispatch(loadStart());

    return new Promise((resolve, reject) => {
        fire.auth().createUserWithEmailAndPassword(email, password).then(res => {
            const uid = res.user.uid;
            dispatch(isRegisteredHandler(true));
            dispatch(dataReceived(uid));
            resolve('success')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch(errorOccurredHandler(errorMessage));
            reject(error)
        });
    });
};

export const login = ({ email, password }) => (dispatch) => {
    dispatch(loadStart());

    return new Promise((resolve, reject) => {
        fire.auth().signInWithEmailAndPassword(email, password).then(res => {
            const uid = res.user.uid;
            localStorage.setItem('uid', uid);
            dispatch(isLoggedInHandler(true));
            dispatch(dataReceived(uid));
            resolve('success')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                dispatch(errorOccurredHandler('Wrong password.'));
            } else {
                dispatch(errorOccurredHandler(errorMessage));
            }
            reject(error)
        });
    });
};

export const clearReducerHandler = (value) => (dispatch) => {
    dispatch(clearReducer(value));
};

export const errorOccurredHandler = (value) => (dispatch) => {
    dispatch(errorOccurred(value));
};

export const isLoggedInHandler = (value) => (dispatch) => {
    dispatch(isLoggedIn(value));
};

export const isRegisteredHandler = (value) => (dispatch) => {
    dispatch(isRegistered(value));
};