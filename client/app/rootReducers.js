import { combineReducers } from 'redux';

import { reducer as registerFormReducer } from '~/modules/Register/reducer';

export const rootReducers = combineReducers({
    register: registerFormReducer
});
