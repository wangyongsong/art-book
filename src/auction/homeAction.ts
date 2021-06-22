import { Dispatch } from 'redux';
import homeConstants from '../constants/homeConstants';

export function addTodo(dispatch: Dispatch, data?: any) {
  dispatch({
    type: homeConstants.ADD_TODO,
    data,
  });
}

export function removeTodo(id: any) {
  return {
    type: 'REMOVE_TODO',
    id,
  };
}
