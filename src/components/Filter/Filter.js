import React from 'react';
import './Filter.less';
import { Col, Input, Radio, Button, Space } from 'antd';

const Filter = props => {
  const {searchByEnter, getQuery, query, getSearch, fetchQueryData, searchModes} = props;
    return (
      <Space direction="vertical" size="middle">
      <label forhtml="name">
          <Input size="large" placeholder="Search by artist or album" onKeyPress={searchByEnter} onChange={getQuery} value={query}></Input>
      </label>
      <Col>
        <Radio.Group onChange={getSearch} defaultValue={searchModes[0].value}>
          {searchModes.map((mode, index) => (
            <Radio key={`filter_radio_${index}`} value={mode.value}>{mode.label}</Radio>
          ))}
        </Radio.Group>
      </Col>
        <Button type="primary" disabled={!query} onClick={fetchQueryData} size="large">Search</Button> 
      </Space>
    )
}
  
export default Filter;