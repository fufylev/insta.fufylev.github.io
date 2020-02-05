import { createAction } from 'redux-actions';

export const loadStart = createAction('[Pictures] Load start');
export const dataReceived = createAction('[Pictures] Data received');
export const clearStore = createAction('[Pictures] Clear Store');
export const picturesToStore = createAction('[Pictures] Upload pictures to STORE');

export const loadStartHandler = () => (dispatch) => {
    return new Promise((res, rej) => {
        dispatch(loadStart());
        res()
    });
};

export const clearStoreHandler = () => (dispatch) => {
    return new Promise((res, rej) => {
        dispatch(clearStore());
        res()
    });
};

export const picturesUploadHandler = (pictures) => (dispatch) => {
    dispatch(dataReceived());
    dispatch(picturesToStore({ ...pictures }));
};