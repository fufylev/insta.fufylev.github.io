import { createAction } from 'redux-actions';
import { getCollection } from '~/libs/api/API';

export const loadStart = createAction('[Pictures] Load start');
export const dataReceived = createAction('[Pictures] Data received');
export const picturesToStore = createAction('[Pictures] Upload pictures to STORE');

const receivePictures = (collection) => (dispatch) => {
    dispatch(loadStart());
    getCollection(collection).then(pictures => dispatch(dataReceived({ ...pictures })));
};

export const receivePicturesHandler = (collection) => (dispatch) => {
    dispatch(receivePictures(collection));
};

const picturesUpload = (pictures) => (dispatch) => {
    dispatch(picturesToStore({ ...pictures }));
};

export const picturesUploadHandler = (pictures) => (dispatch) => {
    dispatch(picturesUpload(pictures));
};