import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, Card, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const List = props => {
  const { data } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>Artists</Title></Divider>
        <Row>
            {data.map(item => { 
              return (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                  <Link to={`/${item.type}/${item.id}`} className="">
                    <Card bordered={false} cover={<Avatar gap={0} style={{margin: 'auto'}} size={150} src={item.thumb} icon={<UserOutlined/>}></Avatar>}>
                      <Meta title={item.title}></Meta>
                    </Card>
                  </Link>
                </Col>
              )
            })}
        </Row>
      </>
    )
}

export default List;