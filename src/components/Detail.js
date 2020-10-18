import React from 'react';
import {options} from '../services/IndividualSearch';
import { Card, Breadcrumb, Image } from 'antd';

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
    const {item} = this.state;
      return (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{item.name || item.title}</Breadcrumb.Item>
          </Breadcrumb>
          <Card hoverable>
          <Image width={150} src={item.images && item.images[0].resource_url} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
            <p>{item.name || item.title}</p>
            {item.artists && item.artists.map((artist) => { return ( 
              <p key={artist.id}>{artist.name}</p>
            )})}
            {item.namevariations && <p>Also known as: {item.namevariations}</p>}
            <p>{item.year}</p>
            <p>{item.profile || item.notes}</p>
            {item.styles && <p>Styles: {item.styles}</p>}
            {item.genres && <p>Genres: {item.genres}</p>}
            {item.tracklist &&<ol>Tracklist:
              {item.tracklist && item.tracklist.map((track) => { return (
                <li key={track.position}><span>{track.title}</span><span>{track.duration}</span></li>
              )})}
            </ol>}
            {item.members &&<ol>Members:
              {item.members && item.members.map((member) => { return (
                <li key={member.id}>
                  <Image width={50} src={member.thumbnail_url} fallback="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=14"></Image>
                  <p>{member.name}</p>
                  </li>
              )})}
            </ol>}
          </Card>
        </>
      )
  }
}

export default Detail;