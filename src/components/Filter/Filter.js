import React from 'react';
import './Filter.less';
import { Col, Input, Radio, Button } from 'antd';

const Filter = props => {
  const {searchByEnter, getQuery, query, getSearch, fetchQueryData, searchModes} = props;
    return (
      <div className="filter-section">
        <label forhtml="name">
          <Input className="filter-input" size="large" placeholder="Search by artist or album" onKeyPress={searchByEnter} onChange={getQuery} value={query}></Input>
        </label>
        <Col className="filter-radio-group">
          <Radio.Group onChange={getSearch} defaultValue={searchModes[0].value}>
            {searchModes.map((mode, index) => (
              <Radio key={`filter_radio_${index}`} value={mode.value}>{mode.label}</Radio>
            ))}
          </Radio.Group>
        </Col>
        <Button type="primary" disabled={!query} onClick={fetchQueryData} size="large" className="search-btn">Search</Button> 
      </div>
    )
}
  
export default Filter;