import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Pagination, Button, Typography, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const List = props => {
  const { data, pagination, changeReleasePage, addToCollection } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>Albums</Title></Divider>
        <Row>
          {data.map(item => { 
            return (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                <Link to={`/${item.type}/${item.id}`} className="">
                  <Card bordered={false} cover={<Image width={150} alt="Album cover" src={item.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"/>}>
                    <Meta title={item.title} description={`${item.country} - ${item.year}`}></Meta>
                  </Card>
                </Link>
                <Button type="primary" shape="circle" icon={<PlusOutlined/>} onClick={() => addToCollection(item.id)}></Button>
              </Col>
            )
          })}
        </Row>
        {pagination.pages !== 1 ? <Pagination size="small" showSizeChanger={false} defaultCurrent={pagination.page} total={pagination.items} onChange={changeReleasePage} pageSize={25}/> : ''}
      </>
    )
}

export default List;