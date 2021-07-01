/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Select } from 'antd';

import './index.global.scss';
import { cloneDeep } from 'lodash';

const { Option } = Select;

const ColorSelect = (props: any) => {
  const { options = [] } = props;
  const data = cloneDeep(props);
  delete data.options;
  return (
    <Select {...data}>
      {options.map((item: any) => {
        return (
          <Option value={item.value} label={item.label} key={item.value}>
            <div className="colorOptionLabelItem">
              <span
                role="img"
                aria-label={item.label}
                className="roundItem"
                style={{ color: item.value }}
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

export default ColorSelect;
