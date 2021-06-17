/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import {
  Image,
  Checkbox,
  Pagination,
  Menu,
  Dropdown,
  Button,
  Tooltip,
} from 'antd';
import {
  TagFilled,
  CopyOutlined,
  FormOutlined,
  EllipsisOutlined,
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import './resourceManager.global.scss';

const plainOptions: any[] = [];

for (let index = 2; index < 10000; index++) {
  plainOptions.push({
    id: index,
    tag: { color: '#177ddc', name: '常规' },
    createdTime: '2021-12-18 23:58:58',
    src:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea16646c40fc45639ff04f44f09bb90d~tplv-k3u1fbpfcp-watermark.image',
  });
}

const ResourceManager = () => {
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);
  const [current, setCurrent] = useState(1);

  const checkOnChange = (list: any) => {
    setCheckedList(list);
  };

  const computedElement = () => {
    const resourceItemEle: HTMLElement | null = document.querySelector(
      '.resourceItem'
    );
    const resourceBoxEle: HTMLElement | null = document.querySelector(
      '.resourceBox'
    );

    const itemHeight: any = resourceItemEle?.offsetHeight || 92;
    const itemWidth: any = resourceItemEle?.offsetWidth || 73;

    const resourceBoxHeight: any = resourceBoxEle?.offsetHeight;
    const resourceBoxWidth: any = resourceBoxEle?.offsetWidth;
    const xNum = Math.floor(resourceBoxWidth / itemWidth);
    const yNum = Math.floor(resourceBoxHeight / itemHeight);
    console.log(itemHeight, itemWidth);
    const pageSize = xNum * yNum;
    return pageSize;
  };

  const paginationChange = (page: number) => {
    setCurrent(page);
    const sum = computedElement();
    setShowList([...plainOptions.slice((page - 1) * sum, page * sum)]);
  };

  useEffect(() => {
    paginationChange(1);
  }, []);

  const menuOnClick = ({ key }: any) => {
    switch (key) {
      case '1':
        setCheckedList([...showList]);
        break;
      case '2':
        setCheckedList([...plainOptions]);
        break;
      case '3':
        setCheckedList([]);
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={menuOnClick}>
      <Menu.Item key="1" icon={<PlusOutlined />}>
        选中当前页
      </Menu.Item>
      <Menu.Item key="2" icon={<PlusCircleOutlined />}>
        全选所有页
      </Menu.Item>
      <Menu.Item key="3" icon={<CloseCircleOutlined />}>
        清空选中项
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="resourceManagerContent">
      {/* header */}
      <div className="resourceManagerHeader">
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="primary" size="small" ghost>
              批量选中 <DownOutlined />
            </Button>
          </Dropdown>
          {!!checkedList.length && (
            <span className="selectNum">已选择 {checkedList.length} 项</span>
          )}
        </div>
      </div>

      {/* body */}
      <Checkbox.Group
        className="resourceBox"
        onChange={checkOnChange}
        value={checkedList}
      >
        <Image.PreviewGroup>
          {showList.map((item: any) => {
            return (
              <div key={item.id} className="resourceItem">
                <Image
                  width={60}
                  height={60}
                  src={item.src}
                  className="resourceImage"
                  preview={{
                    mask: (
                      <div className="previewImgText">
                        <div>
                          <EyeOutlined /> 预览
                        </div>
                        <div>{item.createdTime}</div>
                      </div>
                    ),
                  }}
                />
                <Checkbox value={item} className="checkbox" />
                <div className="resourceTool">
                  <Tooltip title={item.tag.name}>
                    <div
                      style={{ background: item.tag.color }}
                      className="resourceItemTag toolIcon"
                    />
                  </Tooltip>
                  <CopyOutlined className="toolIcon" />
                  <DeleteOutlined className="toolIcon" />
                  <Dropdown overlay={menu}>
                    <EllipsisOutlined className="toolIconLast" />
                  </Dropdown>
                  {/* <span className="toolIcon"> {item.id}</span> */}
                </div>
              </div>
            );
          })}
        </Image.PreviewGroup>
      </Checkbox.Group>

      {/* footer */}
      <div className="resourceManagerFooter">
        <Pagination
          simple
          total={plainOptions.length}
          size="small"
          pageSize={computedElement()}
          current={current}
          onChange={paginationChange}
          showTotal={(total) => `总共 ${total} 条`}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
