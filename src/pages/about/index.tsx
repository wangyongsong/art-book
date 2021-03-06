import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../auction/homeAction';
import db from '../../db';
// import '../../db';

const About = (props: any) => {
  const data = useSelector((state: any) => state.homeReducer);
  const dispatch = useDispatch();

  const add = useCallback(() => addTodo(dispatch, { val: 9999 }), [dispatch]);

  return (
    <div>
      {data.count}

      <Button onClick={add}>测试按钮</Button>
      <Button
        onClick={() => {
          db.insert('images', {
            value: 'asd',
          });
        }}
      >
        测试按钮
      </Button>
    </div>
  );
};

// export default connect((data: any) => {
//   // console.log(`data`, data);
//   return { homeReducer: data.homeReducer };
// })(About);

export default About;
