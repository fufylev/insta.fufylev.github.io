import { createAction } from 'redux-actions';
import { getCollection } from '~/libs/api/API';

export const loadStart = createAction('[Users] Load start');
export const dataReceived = createAction('[Users] Data received');

const receiveUsers = (collection) => (dispatch) => {
    dispatch(loadStart());
    getCollection(collection).then(users => dispatch(dataReceived({...users})));
};

export const receiveUsersHandler = (collection) => (dispatch) => {
    dispatch(receiveUsers(collection));
};