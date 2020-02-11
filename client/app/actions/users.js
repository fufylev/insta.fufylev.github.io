import { createAction } from 'redux-actions';
import { checkIfUserMetadataExists, setUser } from '~/libs/api/API';

export const loadStart = createAction('[Users] Load start');
export const dataReceived = createAction('[Users] Data received');
export const saveUser = createAction('[Users] Save User to state');
export const clearStore = createAction('[Users] Clear Store');

export const clearUsersStoreHandler = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(clearStore());
        resolve();
    });
};

const saveUserToState = (user) => (dispatch) => {
    dispatch(saveUser(user));
};

const setUserToDataBase = () => (dispatch) => {
    dispatch(loadStart());
    setUser().then(res => {
        if (res === true) {
            dispatch(dataReceived(res));
            checkIfUserMetadataExists(localStorage.getItem('uid'))
                .then(({ ifExists, metadata }) => {
                    if (ifExists) {
                        dispatch(saveUserToState(metadata));
                    } else {
                        console.log('не прошло');
                    }
                });
        }
    });
};

export const saveUserToStateHandler = (user) => (dispatch) => {
    dispatch(saveUserToState(user));
};

export const setUserToDataBaseHandler = () => (dispatch) => {
    dispatch(setUserToDataBase());
};