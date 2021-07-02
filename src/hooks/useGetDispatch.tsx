import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getImages } from '../auction/homeAction';

const UseGetImages = () => {
  const dispatch = useDispatch();
  const getImagesList = useCallback(() => getImages(dispatch), [dispatch]);

  return { getImagesList };
};
export default UseGetImages;
