import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, Typography, Divider, Avatar } from 'antd';
import './List.less';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const List = props => {
  const { data, addToCollection } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>{data[0].type === 'release' ? 'Albums' : 'Artists'}</Title></Divider>
        <Row gutter={[0, 24]}>
          {data.map(item => { 
            return (
              <Col xs={24} sm={6} md={4} lg={3}  key={item.id}>
                <Link to={`/${item.type}/${item.id}`} className="">
                  <Card hoverable bordered={false} cover={item.country ? 
                    <Image width={100} alt="Album cover" src={item.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"/> 
                    : <Avatar gap={0} size={100} src={item.thumb} icon={<UserOutlined/>}></Avatar>}>
                    <Meta title={item.title} description={item.country ? `${item.country} - ${item.year}` : ''}></Meta>
                  </Card>
                </Link>
                {data[0].type === 'release' && <Button size="small" className="add-btn" type="primary" shape="circle" icon={<PlusOutlined/>} onClick={() => addToCollection(item.id)}></Button>}
              </Col>
            )
          })}
        </Row>
      </>
    )
}

export default List;