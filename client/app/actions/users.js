import { createAction } from 'redux-actions';
import { read } from '~/libs/api/API';

export const loadStart = createAction('[Users] Load start');
export const dataReceived = createAction('[Users] Data received');

const receiveUsers = (url) => (dispatch) => {
    dispatch(loadStart());
    read(url).then(users => dispatch(dataReceived({...users})));
};

export const receiveUsersHandler = (url) => (dispatch) => {
    dispatch(receiveUsers(url));
};