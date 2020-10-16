import React from 'react';
import { Row, Input, Radio, Button } from 'antd';

const Filter = props => {
  const {searchByEnter, getQuery, query, getSearch, fetchQueryData} = props;
    return (
      <Row>
        <label forhtml="name">
          <Input placeholder="Search by artist or album" onKeyPress={searchByEnter} onChange={getQuery} value={query}></Input>
        </label>
        <Radio.Group onChange={getSearch} defaultValue="artist">
          <Radio value="artist">Artist</Radio>
          <Radio value="release">Album</Radio>
          <Radio value="both">Both</Radio>
        </Radio.Group>

        <Button type="primary" disabled={!query} onClick={fetchQueryData}>Search</Button> 
      </Row>
    )
}
  
  export default Filter;