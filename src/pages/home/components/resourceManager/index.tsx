/* eslint-disable no-plusplus */
import React from 'react';
import { Image, Checkbox } from 'antd';
import {
  CopyOutlined,
  FormOutlined,
  DeleteOutlined,
  // RedoOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import './resourceManager.global.scss';

const plainOptions = [
  {
    id: 0,
    src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  {
    id: 1,
    src:
      'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
  },
];

for (let index = 2; index < 1000; index++) {
  plainOptions.push({
    id: index,
    src:
      'https://imrorwxhijjqlo5q-static.micyjz.com/cloud/mkBpiKmlRliSlnlpqjllk/22.jpg',
  });
}
const ResourceManager = () => {
  const [checkedList, setCheckedList] = React.useState<any[]>([]);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = (list: any) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  console.log(`111111`, 111111);

  return (
    <div className="resourceManagerContent">
      <div className="resourceManagerHeader">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
      </div>
      <Checkbox.Group
        className="resourceBox"
        onChange={onChange}
        value={checkedList}
      >
        {/* <div className="resourceBox"> */}
        <Image.PreviewGroup>
          {plainOptions.map((item: any) => {
            return (
              <div key={item.id} className="resourceItem">
                <Image
                  width={60}
                  height={60}
                  src={item.src}
                  className="resourceImage"
                  preview={{
                    mask: (
                      <div>
                        <EyeOutlined /> 预览
                      </div>
                    ),
                  }}
                />
                <Checkbox value={item} className="checkbox" />
                <div className="resourceTool">
                  <CopyOutlined />
                  <FormOutlined />
                  <DeleteOutlined />
                  {/* <RedoOutlined /> */}
                </div>
              </div>
            );
          })}
        </Image.PreviewGroup>
        {/* </div> */}
      </Checkbox.Group>
    </div>
  );
};

export default ResourceManager;
