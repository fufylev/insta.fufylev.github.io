import { combineReducers } from 'redux';

import { reducer as authenticationReducer } from '~/reducers/authentication';
import { reducer as usersReducer } from '~/reducers/users';
import { reducer as picturesReducer } from '~/reducers/pictures';

export const rootReducers = combineReducers({
    authentication: authenticationReducer,
    users: usersReducer,
    pictures: picturesReducer,
});
