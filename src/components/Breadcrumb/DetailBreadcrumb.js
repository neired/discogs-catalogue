import React from 'react';
import { Breadcrumb } from 'antd';
import './DetailBreadcrum.less';

const DetailBreadcrumb = props => {
  const { current } = props;
    return (
        <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <a href="./">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{current}</Breadcrumb.Item>
      </Breadcrumb>
    )
}

export default DetailBreadcrumb;