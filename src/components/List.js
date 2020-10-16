import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card } from 'antd';

const List = props => {
  const {data} = props;
    return (
      <Row gutter={[32, 32]}>
          {data.map(item => { 
            return (
              //shouldn't this be a list?
              <Col span={6} key={item.id}>
                <Link to={`/${item.type}/${item.id}`} className="">
                <Card hoverable>
                  <Image width={150} src={item.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
                  <p>{item.title}</p>
                  {item.country && <p>{item.country} - {item.year}</p>}
                </Card>
                </Link>
              </Col>
            )
          })}
      </Row>
    )
}

export default List;