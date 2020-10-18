import React from 'react';
import {options} from '../services/IndividualSearch';
import { Card, Breadcrumb, Image, Typography } from 'antd';

class Detail extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      item: ''
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
      .catch(error => console.log('Oops!', error))
      .then(data => {
        this.setState({ item: data })
      })
  }

  render() {
    const { item } = this.state;
    const { Title, Text, Paragraph } = Typography;
      return (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{item.name || item.title}</Breadcrumb.Item>
          </Breadcrumb>
          <Card>
          <Image width={150} src={item.images && item.images[0].resource_url} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
            <Title level={2}>{item.name || item.title}</Title>
            {item.artists && item.artists.map((artist) => { return ( 
              <Title level={3} key={artist.id}>{artist.name}</Title>
            )})}
            {item.namevariations && <Text>Also known as: {item.namevariations}</Text>}
            <Text>{item.year}</Text>
            <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>{item.profile || item.notes}</Paragraph>
            {item.styles && <Text>Styles: {item.styles}</Text>}
            {item.genres && <Text>Genres: {item.genres}</Text>}
            {item.tracklist &&<ol>Tracklist:
              {item.tracklist && item.tracklist.map((track) => { return (
                <li key={track.position}><span>{track.title}</span><span>{track.duration}</span></li>
              )})}
            </ol>}
            {item.members &&<ol>Members:
              {item.members && item.members.map((member) => { return (
                <li key={member.id}>
                  <Image width={50} src={member.thumbnail_url} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
                  <Text>{member.name}</Text>
                </li>
            )})}
            </ol>}
          </Card>
        </>
      )
  }
}

export default Detail;