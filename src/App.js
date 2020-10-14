import React from 'react';
import './App.scss';
import {fetchData} from './services/fetch';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: [],
      query: ''
    }
    this.getUserInput = this.getUserInput.bind(this);
    this.fetchQueryData = this.fetchQueryData.bind(this);
    this.searchByEnter = this.searchByEnter.bind(this);
  };

  getUserInput(event) {
    const query = event.currentTarget.value;
    this.setState({
      query : query
    })
  }

  fetchQueryData() {
    fetchData(this.state.query)
    .then(data => {
      console.log(data);
      this.setState({
        data: data.results
      })
      console.log(this.state.data);
    });
  }
  searchByEnter(event) {
    if (event.key === "Enter") {
      this.fetchQueryData();
    }
  }
  componentDidMount() {
  }

  render() {
    const { query } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <label forhtml="name"></label>
          <input className="input" type="text" name="name" placeholder="Search by artist or album" onChange={this.getUserInput} onKeyPress={this.searchByEnter} value={query}></input>
          <button type="button" onClick={this.fetchQueryData}>Search</button>
        </header>
      </div>
    );
  }
}

export default App;