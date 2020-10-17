import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Pagination } from 'antd';

const List = props => {
  const { data, pagination, changeArtistPage } = props;
    return (
      <>
      <h2>Artists</h2>
      <Row gutter={[32, 32]}>
          {data.map(item => { 
            return (
              //shouldn't this be a list?
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                <Link to={`/${item.type}/${item.id}`} className="">
                <Card hoverable>
                  <Image width={150} src={item.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
                  <p>{item.title}</p>
                </Card>
                </Link>
              </Col>
            )
          })}
      </Row>
      {pagination.pages !== 1 ? <Pagination showSizeChanger={false} current={pagination.page} total={pagination.items} onChange={changeArtistPage} pageSize={25}/> : ''}
      </>
    )
}

export default List;