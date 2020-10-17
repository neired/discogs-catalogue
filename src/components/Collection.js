import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Pagination } from 'antd';

const Collection = props => {
  const { data, pagination, changeCollectionPage } = props;
    return (
      <>
      <h2>Collection</h2>
      <Row gutter={[32, 32]}>
          {data.map(item => { 
            return (
              //shouldn't this be a List?
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                <Link to={`/release/${item.id}`} className="">
                <Card>
                  <Image width={150} src={item.basic_information.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
                  <p>{item.basic_information.title}</p>
                  <p>{item.basic_information.year}</p>
                </Card>
                </Link>
              </Col>
            )
          })}
      </Row>
      {pagination.pages !== 1 ? <Pagination showSizeChanger={false} defaultCurrent={pagination.page} total={pagination.items} onChange={changeCollectionPage} pageSize={25}/> : ''}
      </>
    )
}

export default Collection;