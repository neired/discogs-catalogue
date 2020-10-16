import React from 'react';
import './App.scss';
import List from './components/List';
import {fetchIndividualData, options} from './services/IndividualSearch';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.ref = React.createRef();
    this.state = {
      artists: [],
      releases: [],
      query: '',
      searchBy: 'both'
    }
    this.getQuery = this.getQuery.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.fetchQueryData = this.fetchQueryData.bind(this);
    this.searchByEnter = this.searchByEnter.bind(this);
    this.fetchCombinedData = this.fetchCombinedData.bind(this);
  };

  getQuery(event) {
    const query = event.currentTarget.value;
    this.setState({
      query : query
    })
  }
  getSearch(event) {
    const search = event.target.value;
    this.setState({
      searchBy: search
    })
  }
  async fetchCombinedData(query) {
    let ENDPOINTS = [`https://api.discogs.com/database/search?type=artist&q=${query}&per_page=25`, `https://api.discogs.com/database/search?type=release&q=${query}&per_page=25`]
    let requests = ENDPOINTS.map(url => 
      fetch(url, options)
      .then(response => response.json())
      .catch(error =>console.log(error))
    );
    const responses = await Promise.all(requests);
    console.log(responses);
    this.setState({
      artists: responses[0].results,
      releases: responses[1].results
    });
  }
  fetchQueryData() {
    if (this.state.searchBy !== 'both') {
      fetchIndividualData(this.state.query, this.state.searchBy)
      .then(data => {
        if (this.state.searchBy === 'artist') {
          this.setState({
            artists: data.results,
            releases: []
          });
          console.log(this.state.artists);
        } else {
          this.setState({
            artists: [],
            releases: data.results
          });
          console.log(this.state.releases);
        }
      });
    } else if (this.state.searchBy === 'both') {
      this.fetchCombinedData(this.state.query)
    }
  }
  searchByEnter(event) {
    if (event.key === "Enter") {
      this.fetchQueryData();
    }
  }

  render() {
    const { query, artists, releases } = this.state;
    return (
      <div className="App">
        <Header></Header>
        <main>
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <>
                  <Filter 
                    searchByEnter={this.searchByEnter} 
                    getQuery={this.getQuery} 
                    getSearch={this.getSearch} 
                    fetchQueryData={this.fetchQueryData}
                    query={query} 
                  ></Filter>
                  <List data={artists}></List>
                  <List data={releases}></List>
                </>
              )
            }} />
            <Route path="/:detailType/:detailID" render={routerProps => {
              return (
                <Detail 
                  routerProps={routerProps}
                />
              );
            }} />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;