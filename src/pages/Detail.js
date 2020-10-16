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
    const {routerProps, releases, artists} = this.props;
    const detailID = parseInt(routerProps.match.params.detailID);
    const detailType = routerProps.match.params.detailType;
    let item = '';
    if (detailType === 'release') {
      item = releases.filter(item => item.id === detailID);
    } else if (detailType === 'artist') {
      item = artists.filter(item => item.id === detailID);
    }
    
    fetch(item[0].resource_url, options)
    .then(res => res.json())
    .catch(error => console.log('Oops!', error))
    .then(data => {
      this.setState({
        item: data
      })
      console.log(this.state.item)
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