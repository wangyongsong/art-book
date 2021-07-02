/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import githubUpload from '../../../../core/github/githubUpload';
import { urlTransform } from '../../../../utils/commonUtils';
import imageError from '../../../../assets/general/noNetWork.svg';
import useDeleteCore from '../../../../core/deleteCore';
import useGetDispatch from '../../../../hooks/useGetDispatch';

const ResourceManager = () => {
  const { images } = useSelector((state: any) => state.homeReducer);
  const filterImageForm = db.get('filterImageForm');
  const { getImagesList } = useGetDispatch();
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);
  const [current, setCurrent] = useState(1);
  const [comptedPageSize, setComptedPageSize] = useState(32);
  const { confirmDeleteImage } = useDeleteCore();
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
    getImagesList();
    paginationChange(1);
    githubUpload.reload(getImagesList);
  }, []);

  useEffect(() => {
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

  // const pictureMenu = (

  // );

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
            <Button type="primary" size="small" ghost style={{ marginLeft: 5 }}>
              批量操作 <DownOutlined />
            </Button>
          )}
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
            getImagesList();
            paginationChange(1);
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
          <Form.Item name="createdTime" noStyle>
            <DatePicker placeholder="筛选上传时间" allowClear />
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
                    fallback={imageError}
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
                      <CopyOutlined
                        className="toolIcon"
                        onClick={() => urlTransform([item], 'url')}
                      />
                    </Tooltip>
                    <Tooltip title="删除">
                      <DeleteOutlined
                        className="toolIcon"
                        onClick={() => confirmDeleteImage([item])}
                      />
                    </Tooltip>
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(info) => {
                            switch (info.key) {
                              case 'html':
                                urlTransform([item], 'html');
                                break;
                              case 'markdown':
                                urlTransform([item], 'markdown');
                                break;
                              default:
                                break;
                            }
                          }}
                        >
                          <Menu.Item key="html" icon={<CopyOutlined />}>
                            生成 HTML 链接
                          </Menu.Item>
                          <Menu.Item key="markdown" icon={<CopyOutlined />}>
                            生成 MarkDown 链接
                          </Menu.Item>
                        </Menu>
                      }
                    >
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
