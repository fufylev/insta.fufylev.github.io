import { createAction } from 'redux-actions';
import { read } from '~/libs/api/API';

export const loadStart = createAction('[Pictures] Load start');
export const dataReceived = createAction('[Pictures] Data received');

const receivePictures = (url) => (dispatch) => {
    dispatch(loadStart());
    read(url).then(pictures => dispatch(dataReceived({...pictures})));
};

export const receivePicturesHandler = (url) => (dispatch) => {
    dispatch(receivePictures(url));
};