import * as types from '../actions/types';
// import { fetchUser } from '../actions/index';
// import { updateObject } from '../shared/utility';

export default function (state = null, action) {
  switch (action.type) {
    case types.FETCH_USER: return action.payload || false;
    default: return state;
  }
}
