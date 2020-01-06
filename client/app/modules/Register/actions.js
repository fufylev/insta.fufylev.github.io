import { createAction } from 'redux-actions';

export const loadStart = createAction('[Register] Load start');
export const dataReceived = createAction('[Register] Data received');
export const errorOccurred = createAction('[Register] Error Occurred');
export const mobileOrEmailInput = createAction('[MobileOrEmail] Input');
export const fullNameInput = createAction('[FullName] Input');
export const userNameInput = createAction('[UserName] Input');
export const passwordInput = createAction('[Password] Input');

export const load = () => (dispatch, getState) => {
    const state = getState();
    dispatch(loadStart());

    const { mobileOrEmail, fullName, userName, password, avatar, bio } = state.register;
    let { mobile, email } = state.register;
    const emailPattern = /^[0-9a-zA-Z-\.]+\@[0-9a-zA-Z-]{2,}\.[a-zA-Z]{2,}$/i;

    if (emailPattern.test(mobileOrEmail)) {
        email = mobileOrEmail
    } else {
        mobile = mobileOrEmail
    }
    const data = { mobile, email, fullName, userName, password, avatar, bio };

    fetch('http://localhost:8888/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then((data) => {
            dispatch(dataReceived(data));
        })
        .catch((error) => {
            dispatch(errorOccurred(error));
        });
};

export const mobileOrEmail = (value) => (dispatch) => {
    dispatch(mobileOrEmailInput(value));
};

export const fullName = (value) => (dispatch) => {
    dispatch(fullNameInput(value));
};

export const userName = (value) => (dispatch) => {
    dispatch(userNameInput(value));
};

export const password = (value) => (dispatch) => {
    dispatch(passwordInput(value));
};