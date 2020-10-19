import React from 'react';
import {options} from '../../services/DiscogsFetches';
import { Card, Image, Typography, Spin, Space, Avatar, Row, Col } from 'antd';
import './Detail.less';
import DetailBreadcrumb from '../Breadcrumb/DetailBreadcrumb';
class Detail extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      item: '',
      loading: true,
      error: false
    }
  };

  componentDidMount() {
    const {routerProps} = this.props;
    const detailID = parseInt(routerProps.match.params.detailID);
    const detailType = routerProps.match.params.detailType || 'release';
    this.fetchDetail(detailType, detailID);
  }

  fetchDetail(type, id) {
    const url = `https://api.discogs.com/${type}s/${id}`;
    fetch(url, options)
      .then(res => res.json())
      .catch(error => {console.log('Oops!', error); this.setState({ error: true })})
      .then(data => {
        this.setState({ item: data, loading: false })
      })
  }
  
  render() {
    const { item, loading, error } = this.state;
    console.log(item);
    const { Title, Text, Paragraph } = Typography;
    const placeholderImg = `https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=40`;
    
    if (item && item.name) {
      return (
        <div className="detail-section">
          <DetailBreadcrumb current={item.name}></DetailBreadcrumb>
          <Card className="detail-card">
            <div className="detail-header">
              <Image className="detail-img" size={150} width={150} src={item.images ? item.images[0].resource_url : placeholderImg}></Image>
              <div className="detail-header-text">
                <Title level={2}>{item.name}</Title>
                {item.namevariations && <Text><span className="default-text">Also known as:</span> {item.namevariations.join(', ')}</Text>}
              </div>
            </div>
            <Paragraph className="detail-description" ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>{item.profile}</Paragraph>
            {item.members &&
              <Row>
                {item.members && item.members.map((member) => { return (
                  <Col xs={24} sm={12} md={6} lg={5} className="detail-members" key={member.id}>
                    <Space size="middle">
                      <Avatar size={50} src={member.thumbnail_url || placeholderImg}></Avatar>
                      <Text>{member.name}</Text>
                    </Space>
                  </Col>
                )})}
              </Row>}
          </Card>
        </div>
      )
    } else if (item && item.title) {
      const artistsArr = [];
      item.artists && item.artists.map((artist) => artistsArr.push(artist.name));
      return (
        <div className="detail-section">
          <DetailBreadcrumb current={item.title}></DetailBreadcrumb>
          <Card className="detail-card">
            <div className="detail-header">
              <Image className="detail-img" size={150} width={150} src={item.images ? item.images[0].resource_url : placeholderImg}></Image>
              <div className="detail-header-text">
                <Title level={2}>{item.title} <span className="default-text">by</span> {artistsArr.join(', ')}</Title>
                <Paragraph><span className="default-text">Year:</span> {item.year}</Paragraph>
                {item.styles && <Paragraph><span className="default-text">Styles:</span> {item.styles.join(', ')}</Paragraph>}
                {item.genres && <Paragraph><span className="default-text">Genres:</span> {item.genres.join(', ')}</Paragraph>}
              </div>
            </div>
            <Paragraph className="detail-description" ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>{item.notes}</Paragraph>
              {item.tracklist &&
              <ol className="detail-list"><span className="default-text">Tracklist:</span>
                {item.tracklist && item.tracklist.map((track) => { return (
                  <li className="detail-list-item" key={track.position}>
                    <Space direction="horizontal" split="-">
                      <Text>{track.title}</Text>
                      <Text>{track.duration && <span>{track.duration}</span>}</Text>
                    </Space>
                  </li>
                )})}
              </ol>}
          </Card>
        </div>
      )
    } else if (error) {
      return (
        <div className="detail-section">
          <DetailBreadcrumb current="Error"></DetailBreadcrumb>
          <Card className="detail-card">
            <div className="detail-header">
              <Image width={150} src="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=40"></Image>
              <div className="detail-header-text">
                <Title level={2}>Oops... Something went wrong!</Title>
                <Paragraph>Looks like the artist or album you are looking for doesn't exist yet...</Paragraph>
                <Paragraph>Have you ever considered starting a band of your own?</Paragraph>
              </div>
            </div>
          </Card>
        </div>
      )
    }
    return (
      <Spin className="detail-spin" spinning={loading} size="large"></Spin>
    )
  }
}

export default Detail;