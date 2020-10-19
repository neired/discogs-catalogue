import React from 'react';
import { Link } from 'react-router-dom';
import './Collection.less';
import { Row, Col, Image, Card, Pagination, Typography, Divider } from 'antd';

const Collection = props => {
  const { data, pagination, changeCollectionPage } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>Collection</Title></Divider>
        <Row>
          {data.map((item, i) => { 
            return (
              <Col xs={24} sm={6} md={4} lg={3} key={i}>
                <Link to={`/release/${item.id}`} className="">
                  <Card bordered={false} cover={<Image width={100} alt="Album cover" src={item.basic_information.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"/>}>
                    <Meta title={item.basic_information.title} description={item.basic_information.year}></Meta>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
        {pagination.items >= 26 ? <Pagination size="small" showSizeChanger={false} defaultCurrent={pagination.page} total={pagination.items} onChange={changeCollectionPage} pageSize={25}/> : ''}
      </>
    )
}

export default Collection;