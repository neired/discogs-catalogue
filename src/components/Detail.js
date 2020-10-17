import React from 'react';
import {options} from '../services/IndividualSearch';
import { Card, Breadcrumb } from 'antd';

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
            <p>{item.name || item.title}</p>
          </Card>
        </>
      )
  }
}

export default Detail;