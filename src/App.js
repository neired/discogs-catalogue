import React from 'react';
import './App.scss';
import List from './components/List';
import {fetchIndividualData, options} from './services/IndividualSearch';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail';
import Filter from './components/Filter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.ref = React.createRef();
    this.state = {
      artists: [],
      releases: [],
      artistsPag : {},
      releasesPag: {},
      query: '',
      searchBy: 'both'
    }
    this.getQuery = this.getQuery.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.fetchQueryData = this.fetchQueryData.bind(this);
    this.searchByEnter = this.searchByEnter.bind(this);
    this.fetchCombinedData = this.fetchCombinedData.bind(this);
    this.changePage = this.changePage.bind(this);
  };
  componentDidMount() {
    console.log(this.state);
  }
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
    this.setState({
      artists: responses[0].results,
      releases: responses[1].results,
      artistsPag: responses[0].pagination,
      releasesPag: responses[1].pagination
    });
    console.log('pagination', this.state.artistsPag, this.state.releasesPag);
  }
  fetchQueryData() {
    if (this.state.searchBy !== 'both') {
      fetchIndividualData(this.state.query, this.state.searchBy)
      .then(data => {
        if (this.state.searchBy === 'artist') {
          this.setState({
            artists: data.results,
            releases: [],
            artistsPag: data.pagination,
            releasesPag: {}
          });
          console.log(this.state.artistsPag);
        } else {
          this.setState({
            artists: [],
            releases: data.results,
            artistsPag: {},
            releasesPag: data.pagination
          });
          console.log(this.state.releasesPag);
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
  changePage(page, pageSize) {
    console.log(page, pageSize);
    const url = `https://api.discogs.com/database/search?type=${this.state.searchBy}&q=${this.state.query}&per_page=${pageSize}&page=${page}`;
    console.log(url);
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.log('Oops!', error))
      .then(data => {
        if (this.state.searchBy === 'artist') {
          this.setState({
            artists: data.results,
            releases: [],
            artistsPag: data.pagination,
            releasesPag: {}
          });
          console.log(this.state.artistsPag);
        } else {
          this.setState({
            artists: [],
            releases: data.results,
            artistsPag: {},
            releasesPag: data.pagination
          });
          console.log(this.state.releasesPag);
        }
      })
  }
  render() {
    const { query, artists, releases, artistsPag, releasesPag } = this.state;
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
                  <List data={artists} pagination={artistsPag} changePage={this.changePage}></List>
                  <List data={releases} pagination={releasesPag} changePage={this.changePage}></List>
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