import React, { useState, useEffect, useRef } from 'react';
import { Typography, List, Skeleton } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import db from '../../../db';

interface Props {
  visible: boolean;
}

const UploadImageLog = (props: Props) => {
  const { visible } = props;
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  const ref: any = useRef();

  const getUploadImageLog = (load = true, scrollTop = true) => {
    if (load) setloading(true);
    const data = db.get('uploadImagesLog').reverse() || [];
    setDataSource([...data].splice(0, 50));
    if (scrollTop) ref.current.scrollTop = 0;
    if (load) {
      const id = setTimeout(() => {
        setloading(false);
        clearTimeout(id);
      }, 300);
    }
  };

  const setRead = (item: any) => {
    if (item.read) return;
    db.modidyByFilter('uploadImagesLog', { id: item.id }, { read: true });
    getUploadImageLog(false, false);
  };

  const clearUploadImageLog = () => {
    db.set('uploadImagesLog', []);
    getUploadImageLog();
  };

  useEffect(() => {
    if (visible) {
      getUploadImageLog();
    }
  }, [visible]);

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
        {!!dataSource.length && (
          <div className="tooltipList">仅支持查看最近 50 条数据</div>
        )}
      </div>
      <div className="listFooter">
        <div aria-hidden="true" onClick={() => clearUploadImageLog()}>
          清空消息
        </div>
        <div aria-hidden="true" onClick={() => getUploadImageLog()}>
          刷新日志
        </div>
      </div>
    </div>
  );
};

export default UploadImageLog;
