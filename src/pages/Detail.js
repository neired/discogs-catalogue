import React from 'react';
import {options} from '../services/IndividualSearch';
import { Card } from 'antd';

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
    const detailType = routerProps.match.params.detailType;
  
    const url = `https://api.discogs.com/${detailType}s/${detailID}`;
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
        <Card hoverable>
          <p>{item.name}</p>
          <p>{item.title}</p>
        </Card>
      )
  }
}

export default Detail;