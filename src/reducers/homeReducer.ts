import homeConstants from '../constants/homeConstants';

const initialState = {
  queueUploadingImage: [], // 队列图片
  count: 0,
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case homeConstants.ADD_TODO:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

export default homeReducer;
