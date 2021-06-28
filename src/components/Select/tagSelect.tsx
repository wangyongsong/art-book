/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Select } from 'antd';
import CONSTDATA from '../../config/constData';

import './index.global.scss';

const { Option } = Select;

const TagSelect = (props: any) => {
  return (
    <Select {...props}>
      {CONSTDATA.tagOptions.map((item: any) => {
        return (
          <Option value={item.value} label={item.label} key={item.value}>
            <div className="colorOptionLabelItem">
              <span
                role="img"
                aria-label={item.label}
                className="roundItem"
                style={{ color: item.color }}
              >
                ●{' '}
              </span>
              {item.label}
            </div>
          </Option>
        );
      })}
    </Select>
  );
};

export default TagSelect;
