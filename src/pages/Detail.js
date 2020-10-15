import React from 'react';
import {options} from '../services/IndividualSearch';

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
    })
  }
  
  render() {
    const {item} = this.state;
      return (
        <>
          <p>{item.name}</p>
        </>
      )
  }
}

export default Detail;