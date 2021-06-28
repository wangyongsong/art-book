import { Dispatch } from 'redux';
import { filter } from 'lodash';
import homeConstants from '../constants/homeConstants';
import db from '../db';

export function getImages(dispatch: Dispatch) {
  const filterImageForm = db.get('filterImageForm');
  const images = db.get('images');
  let data: any[] = [];

  data = filter(images, (o) => {
    const oCreatedTime = o.createdTime.slice(0, 10);
    const { createdTime, tagId, useAccount } = filterImageForm;
    let d = true;
    if (createdTime) {
      d = oCreatedTime === createdTime;
    }
    if (tagId) {
      d = d && tagId === o.tagId;
    }
    if (useAccount) {
      d = d && useAccount === o.useAccount;
    }
    return d;
  });

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
