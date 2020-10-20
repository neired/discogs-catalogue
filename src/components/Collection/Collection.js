import React from 'react';
import { Link } from 'react-router-dom';
import './Collection.less';
import { Col, Image, Card, Pagination, Typography, Divider, Spin } from 'antd';

const Collection = props => {
  const { data, pagination, changeCollectionPage, loading } = props;
  const { Title } = Typography;
  const { Meta } = Card;
    return (
      <>
        <Divider orientation="left"><Title level={2}>My Collection</Title></Divider>
        <div className="collection-row">
          <Spin spinning={loading} size="large"></Spin>
          {data.map((item, i) => { 
            return (
              <Col key={i}>
                <Link to={`/release/${item.id}`} className="">
                  <Card hoverable bordered={false} cover={<Image width={70} alt="Album cover" src={item.basic_information.thumb} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=40"/>}>
                    <Meta title={item.basic_information.title} description={item.basic_information.year}></Meta>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </div>
        <Pagination 
          hideOnSinglePage 
          size="small" 
          showSizeChanger={false} 
          defaultCurrent={pagination.page} 
          total={pagination.items >= 9996 ? 9996 : pagination.items} 
          onChange={changeCollectionPage} 
          pageSize={25}/>
      </>
    )
}

export default Collection;