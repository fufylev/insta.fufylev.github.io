import { createAction } from 'redux-actions';
import { setUser } from '~/libs/api/API';
import { checkIfUserMetadataExists } from '../libs/api/API';

export const loadStart = createAction('[Users] Load start');
export const dataReceived = createAction('[Users] Data received');
export const saveUser = createAction('[Users] Save User to state');

const saveUserToState = (user) => (dispatch) => {
    dispatch(saveUser(user))
};

const setUserToDataBase = () => (dispatch) => {
    dispatch(loadStart());
    setUser().then(res => {
        if (res === true) {
            dispatch(dataReceived(res));
            checkIfUserMetadataExists(localStorage.getItem('uid'))
                .then(({ifExists, metadata}) => {
                    if (ifExists) {
                        dispatch(saveUserToState(metadata))
                    } else {
                        console.log('не прошло')
                    }
                });
        }
    });
};

export const saveUserToStateHandler = (user) => (dispatch) => {
    dispatch(setUserToDataBase(user));
};

export const setUserToDataBaseHandler = () => (dispatch) => {
    dispatch(setUserToDataBase());
};