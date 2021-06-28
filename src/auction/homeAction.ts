import { Dispatch } from 'redux';
import homeConstants from '../constants/homeConstants';

export function getImages(dispatch: Dispatch, data?: any) {
  dispatch({
    type: homeConstants.GET_IMAGES,
    data,
  });
}

export function removeTodo(id: any) {
  return {
    type: 'REMOVE_TODO',
    id,
  };
}
