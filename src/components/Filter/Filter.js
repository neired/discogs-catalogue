import React from 'react';
import './Filter.scss';
import { Col, Input, Radio, Button } from 'antd';

const Filter = props => {
  const {searchByEnter, getQuery, query, getSearch, fetchQueryData} = props;
    return (
      <>
      <label forhtml="name">
          <Input size="large" placeholder="Search by artist or album" onKeyPress={searchByEnter} onChange={getQuery} value={query}></Input>
      </label>
      <Col>
        <Radio.Group onChange={getSearch} defaultValue="both">
          <Radio value="both">Both</Radio>
          <Radio value="artist">Artist</Radio>
          <Radio value="release">Album</Radio>
        </Radio.Group>
      </Col>
        <Button type="primary" disabled={!query} onClick={fetchQueryData}>Search</Button> 
      </>
    )
}
  
  export default Filter;