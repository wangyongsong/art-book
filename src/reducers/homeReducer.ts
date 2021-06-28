import homeConstants from '../constants/homeConstants';
// import db from '../db';

const initialState = {
  queueUploadingImage: [], // 队列图片
  images: [],
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case homeConstants.GET_IMAGES:
      return { ...state, images: action.data };
    default:
      return state;
  }
};

export default homeReducer;
