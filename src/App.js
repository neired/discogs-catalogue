import React from 'react';
import './App.scss';
import List from './components/List';
import {fetchIndividualData, options} from './services/IndividualSearch';
import { Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      artists: [],
      releases: [],
      query: '',
      searchBy: 'artist'
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
    const search = event.currentTarget.value;
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
          })
        } else {
          this.setState({
            artists: [],
            releases: data.results
          })
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
        <header className="App-header">
          <p>Discogs Catalogue</p>
        </header>
        <main>
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <>
                  <label forhtml="name"></label>
                  <input className="input" type="text" name="artist" placeholder="Search by artist or album" onChange={this.getQuery} onKeyPress={this.searchByEnter} value={query}></input>
                  
                  <input type="radio" id="artist" name="search" value="artist" defaultChecked onChange={this.getSearch}></input>
                  <label htmlFor="artist">Artist</label>
                  <input type="radio" id="release" name="search" value="release" onChange={this.getSearch}></input>
                  <label htmlFor="release">Album</label>
                  <input type="radio" id="both" name="search" value="both" onChange={this.getSearch}></input>
                  <label htmlFor="both">Both</label>

                  <button type="button" onClick={this.fetchQueryData} disabled={!query}>Search</button>
                  <List data={artists}></List>
                  <List data={releases}></List>
                </>
              )
            }} />
            <Route path="/:detailType/:detailID" render={routerProps => {
            return (
              <Detail 
                routerProps={routerProps}
                artists={artists}
                releases={releases}
              />
            );
          }} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;