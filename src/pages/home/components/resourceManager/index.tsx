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
  Result,
} from 'antd';
import {
  CopyOutlined,
  EllipsisOutlined,
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import './resourceManager.global.scss';
import { find } from 'lodash';
import CONSTDATA from '../../../../config/constData';

const plainOptions: any[] = [];

// for (let index = 1; index < 100; index++) {
//   plainOptions.push({
//     id: index,
//     tagId: 2,
//     createdTime: '2021-12-18 23:58:58',
//     src:
//       'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea16646c40fc45639ff04f44f09bb90d~tplv-k3u1fbpfcp-watermark.image',
//   });
// }

const ResourceManager = () => {
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);
  const [current, setCurrent] = useState(1);
  const [comptedPageSize, setComptedPageSize] = useState(32);

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
    // console.log(itemHeight, itemWidth);
    const pageSize = xNum * yNum;
    if (pageSize) setComptedPageSize(pageSize);
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

  const findTagColor = (item: any, name: 'color' | 'label') => {
    const data: any = find(CONSTDATA.tagOptions, {
      value: item.tagId,
    });
    return data[name];
  };

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

  const selectedMenu = (
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

  const pictureMenu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<CopyOutlined />}>
        生成 HTML 链接
      </Menu.Item>
      <Menu.Item key="2" icon={<CopyOutlined />}>
        生成 MarkDown 链接
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="resourceManagerContent">
      {/* header */}
      <div className="resourceManagerHeader">
        <div>
          <Dropdown
            overlay={selectedMenu}
            trigger={['click']}
            disabled={!showList.length}
          >
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
          {showList.length ? (
            showList.map((item: any) => {
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
                    <Tooltip title={findTagColor(item, 'label')}>
                      <div
                        style={{
                          background: findTagColor(item, 'color'),
                        }}
                        className="resourceItemTag toolIcon"
                      />
                    </Tooltip>
                    <Tooltip title="复制链接">
                      <CopyOutlined className="toolIcon" />
                    </Tooltip>
                    <Tooltip title="删除">
                      <DeleteOutlined className="toolIcon" />
                    </Tooltip>
                    <Dropdown overlay={pictureMenu}>
                      <EllipsisOutlined className="toolIconLast" />
                    </Dropdown>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="resourceBoxIsEmpty">
              <Result
                icon={<SmileOutlined />}
                subTitle="您还未上传图片，快去上传吧!"
              />
            </div>
          )}
        </Image.PreviewGroup>
      </Checkbox.Group>

      {/* footer */}
      <div className="resourceManagerFooter">
        <Pagination
          simple
          total={plainOptions.length}
          size="small"
          pageSize={comptedPageSize}
          current={current}
          onChange={paginationChange}
          showTotal={(total) => `总共 ${total} 条`}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
