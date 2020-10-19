import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, Typography, Divider, Avatar } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const List = props => {
  const { data, addToCollection } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>{data[0].type === 'release' ? 'Albums' : 'Artists'}</Title></Divider>
        <Row>
          {data.map(item => { 
            return (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                <Link to={`/${item.type}/${item.id}`} className="">
                  <Card bordered={false} cover={item.country ? 
                    <Image width={150} alt="Album cover" src={item.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"/> 
                    : <Avatar gap={0} style={{margin: 'auto'}} size={150} src={item.thumb} icon={<UserOutlined/>}></Avatar>}>
                    <Meta title={item.title} description={item.country ? `${item.country} - ${item.year}` : ''}></Meta>
                  </Card>
                </Link>
                {data[0].type === 'release' && <Button type="primary" shape="circle" icon={<PlusOutlined/>} onClick={() => addToCollection(item.id)}></Button>}
              </Col>
            )
          })}
        </Row>
      </>
    )
}

export default List;