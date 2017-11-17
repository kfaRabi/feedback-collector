import { FETCH_USER } from '../actions/types';

export default function(state = null, action){
  const type = action.type;
  if(type === FETCH_USER){
    return action.payload || false;
  }
  return state;
}