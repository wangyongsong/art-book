/* eslint-disable no-plusplus */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Menu,
  Image,
  Button,
  Result,
  Tooltip,
  Checkbox,
  Dropdown,
  Pagination,
  Form,
  Select,
  DatePicker,
} from 'antd';
import {
  EyeOutlined,
  CopyOutlined,
  PlusOutlined,
  DownOutlined,
  SmileOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import './resourceManager.global.scss';
import moment from 'moment';
import { cloneDeep, find } from 'lodash';
import CONSTDATA from '../../../../config/constData';
import TagSelect from '../../../../components/Select/tagSelect';
import db from '../../../../db';
import { getImages } from '../../../../auction/homeAction';

const ResourceManager = () => {
  const dispatch = useDispatch();

  const { images } = useSelector((state: any) => state.homeReducer);
  const filterImageForm = db.get('filterImageForm');
  const getImagesCallback = useCallback(() => getImages(dispatch), [dispatch]);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);
  const [current, setCurrent] = useState(1);
  const [comptedPageSize, setComptedPageSize] = useState(32);
  const [form] = Form.useForm();

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
    setShowList([...images.slice((page - 1) * sum, page * sum)]);
  };

  useEffect(() => {
    getImagesCallback();
    paginationChange(1);
  }, []);

  useEffect(() => {
    // getImagesCallback();
    paginationChange(current);
  }, [images]);

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
        setCheckedList([...images]);
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
        <Form
          form={form}
          layout="inline"
          size="small"
          initialValues={{
            ...filterImageForm,
            createdTime: filterImageForm.createdTime
              ? moment(filterImageForm.createdTime)
              : null,
          }}
          onValuesChange={(_, allValues) => {
            const data = cloneDeep(allValues);
            if (data.createdTime) {
              data.createdTime = data.createdTime.format('YYYY-MM-DD');
            }
            db.set('filterImageForm', data);
            getImagesCallback();
          }}
        >
          <Form.Item name="useAccount">
            <Select
              allowClear
              placeholder="筛选账号"
              style={{ width: 93 }}
              options={CONSTDATA.useAccountOptions}
            />
          </Form.Item>
          <Form.Item name="tagId">
            <TagSelect
              placeholder="筛选标签"
              allowClear
              style={{ width: 93 }}
            />
          </Form.Item>
          <Form.Item name="createdTime">
            <DatePicker placeholder="上传时间" allowClear />
          </Form.Item>
        </Form>
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
                title="您还未上传图片，快去上传吧!"
                subTitle={
                  <div>
                    如果初次使用，请先点击左侧的 “ <QuestionCircleOutlined /> ”
                  </div>
                }
              />
            </div>
          )}
        </Image.PreviewGroup>
      </Checkbox.Group>

      {/* footer */}
      <div className="resourceManagerFooter">
        <Pagination
          simple
          total={images.length}
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
