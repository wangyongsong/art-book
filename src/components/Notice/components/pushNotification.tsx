import React, { useState, useRef } from 'react';
import { Typography, List, Skeleton } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface Props {
  visible: boolean;
}

const UploadImageLog = (props: Props) => {
  const { visible } = props;
  const [dataSource] = useState<any[]>([]);
  const [loading] = useState(false);
  const ref: any = useRef();

  const getUploadImageLog = () => {};

  const setRead = (item: any) => {};

  const clearUploadImageLog = () => {};

  // useEffect(() => {
  //   if (visible) {

  //   }
  // }, [visible]);

  return (
    <div className="listContainer">
      <div className="listBody" ref={ref}>
        <List
          className="list"
          loading={loading}
          size="small"
          itemLayout="horizontal"
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item
              className={classNames('itemCls', { read: item.read })}
              onClick={() => setRead(item)}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    item.success ? (
                      <CheckCircleOutlined className="typeColor typeColorSuccess" />
                    ) : (
                      <CloseCircleOutlined className="typeColor typeColorError" />
                    )
                  }
                  title={item.title || '通知'}
                  description={
                    <Typography.Text
                      style={{ width: '80%' }}
                      ellipsis={{ tooltip: item.description }}
                      copyable
                    >
                      {item.description}
                    </Typography.Text>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
      <div className="listFooter">
        <div aria-hidden="true" onClick={() => clearUploadImageLog()}>
          清空消息
        </div>
        <div aria-hidden="true" onClick={() => getUploadImageLog()}>
          刷新消息
        </div>
      </div>
    </div>
  );
};

export default UploadImageLog;
