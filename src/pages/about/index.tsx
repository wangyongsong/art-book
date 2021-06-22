import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../auction/homeAction';

const About = (props: any) => {
  const data = useSelector((state: any) => state.homeReducer);
  const dispatch = useDispatch();

  console.log(`data`, data);

  const add = useCallback(() => addTodo(dispatch, { val: 9999 }), [dispatch]);

  console.log(`props`, props);
  return (
    <div>
      {data.count}

      <Button onClick={add}>测试按钮</Button>
    </div>
  );
};

// export default connect((data: any) => {
//   // console.log(`data`, data);
//   return { homeReducer: data.homeReducer };
// })(About);

export default About;
