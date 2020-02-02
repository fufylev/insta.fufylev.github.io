import { combineReducers } from 'redux';

import { reducer as authenticationReducer } from '~/modules/Authentication/reducer';

export const rootReducers = combineReducers({
    authentication: authenticationReducer
});
