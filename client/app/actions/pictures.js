import { createAction } from 'redux-actions';
import { loadFirstSetOfPictures, loadNextSetOfPictures, getPicture } from '~/libs/api/API';

export const loadStart = createAction('[Pictures] Load start');
export const dataReceived = createAction('[Pictures] Data received');
export const clearStore = createAction('[Pictures] Clear Store');
export const picturesToStore = createAction('[Pictures] Upload pictures to STORE');

export const loadStartHandler = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(loadStart());
        resolve();
    });
};

export const clearPicturesStoreHandler = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(clearStore());
        resolve();
    });
};

export const savePicturesToState = (pictures) => (dispatch) => {
    dispatch(picturesToStore({ ...pictures }));
};

export const picturesUploadHandler = (lastVisible) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(loadStart());
        if (lastVisible === null) {
            loadFirstSetOfPictures()
                .catch(error => reject(error))
                .then((data) => {
                    dispatch(picturesToStore({ ...data.pictures }));
                    dispatch(dataReceived());
                    resolve(data);
                })
        } else {
            loadNextSetOfPictures(lastVisible)
                .catch(error => reject(error))
                .then((data) => {
                    dispatch(picturesToStore({ ...data.pictures }));
                    dispatch(dataReceived());
                    resolve(data);
                });
        }

    });
};

export const getImageHandler = (id) => (dispatch) => {
    dispatch(loadStart());
    return new Promise((resolve, reject) => {
        getPicture(id).then(image => {
            dispatch(dataReceived());
            resolve(image);
        }).catch(error => reject(error))
    });
};