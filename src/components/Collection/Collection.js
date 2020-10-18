import React from 'react';
import { Link } from 'react-router-dom';
import './Collection.scss';
import { Row, Col, Image, Card, Pagination, Typography, Divider } from 'antd';

const Collection = props => {
  const { data, pagination, changeCollectionPage } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>Collection</Title></Divider>
        <Row>
          {data.map(item => { 
            return (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                <Card bordered={false} cover={<Image width={150} alt="Album cover" src={item.basic_information.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"/>}>
                  <Link to={`/release/${item.id}`} className="">
                    <Meta title={item.basic_information.title} description={item.basic_information.year}></Meta>
                  </Link>
                </Card>
              </Col>
            )
          })}
        </Row>
        {pagination.pages !== 1 ? <Pagination size="small" showSizeChanger={false} defaultCurrent={pagination.page} total={pagination.items} onChange={changeCollectionPage} pageSize={25}/> : ''}
      </>
    )
}

export default Collection;