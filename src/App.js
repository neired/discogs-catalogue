import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {fetchData} from './services/fetch';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: [],
      query: ''
    }
  };
  
  componentDidMount() {
    let query = 'pompeii';
    fetchData(query)
    .then(data => {
      console.log(data);
      this.setState({
        data: data.results
      })
      console.log(this.state.data);
    });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
