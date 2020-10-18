import React from 'react';
import './App.scss';
import ReleaseList from './components/ReleaseList';
import ArtistList from './components/ArtistList';
import {fetchIndividualData, options, fetchCollection, postRelease} from './services/IndividualSearch';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Collection from './components/Collection';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.ref = React.createRef();
    this.state = {
      artists: [],
      releases: [],
      collection: [],
      artistsPag : {},
      releasesPag: {},
      collectionPag: {},
      query: '',
      searchBy: 'both',
      isArtist: false,
      isRelease: false
    }
    this.searchModes = [
      {
        label: 'Both',
        value: 'artist, release'
      }, {
        label: 'Artist',
        value: 'artist,'
      }, {
        label: 'Album',
        value: ',release'
      }
    ]
    this.getQuery = this.getQuery.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.fetchQueryData = this.fetchQueryData.bind(this);
    this.searchByEnter = this.searchByEnter.bind(this);
    this.changeArtistPage = this.changeArtistPage.bind(this);
    this.changeReleasePage = this.changeReleasePage.bind(this);
    this.changeCollectionPage = this.changeCollectionPage.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
  };
  componentDidMount() {
    console.log('STATE', this.state);
    fetchCollection()
    .then(data => {
      this.setState({
        collection: data.releases,
        collectionPag: data.pagination
      });
    })
  }
  getQuery(event) {
    const query = event.currentTarget.value;
    this.setState({
      query : query
    })
  }
  getSearch(event) {
    const search = event.target.value;
    const searchArr = search.split(',');
    this.setState({
      searchBy: searchArr
    })
  }

  fetchQueryData() {
    this.setState({
      releases: [],
      releasesPag: {},
      artists: [],
      artistsPag: {},
      isRelease: false,
      isArtist: false,
    })

    const requests = this.state.searchBy.map(type => type ? fetchIndividualData(this.state.query, type) : Promise.resolve(null))
    Promise.all(requests).then(responses => {
      if(responses[0]) {
        this.setState({
          isArtist: true,
          artists: responses[0].results,
          artistsPag: responses[0].pagination,
        })
      }
      if(responses[1]) {
        this.setState({
          isRelease: true,
          releases: responses[1].results,
          releasesPag: responses[1].pagination
        });
      }
    })
  }
  searchByEnter(event) {
    if (event.key === "Enter") {
      this.fetchQueryData();
    }
  }
  // changePage(page, pageSize) {
  //   const url = `https://api.discogs.com/database/search?type=${this.state.searchBy}&q=${this.state.query}&per_page=${pageSize}&page=${page}`;
  //   fetch(url, options)
  //     .then(res => res.json())
  //     .catch(error => console.log('Oops!', error))
  //     .then(data => {
  //       if (this.state.searchBy === 'artist') {
  //         this.setState({
  //           isArtist: true,
  //           artists: data.results,
  //           artistsPag: data.pagination,
  //         });
  //       } else {
  //         this.setState({
  //           isRelease: true,
  //           releases: data.results,
  //           releasesPag: data.pagination
  //         });
  //       }
  //     })
  // }
  changeArtistPage(page, pageSize) {
    const url = `https://api.discogs.com/database/search?type=artist&q=${this.state.query}&per_page=${pageSize}&page=${page}`;
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.log('Oops!', error))
      .then(data => {
        this.setState({
          isArtist: true,
          artists: data.results,
          artistsPag: data.pagination,
        });
      })
  }
  changeReleasePage(page, pageSize) {
    const url = `https://api.discogs.com/database/search?type=release&q=${this.state.query}&per_page=${pageSize}&page=${page}`;
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.log('Oops!', error))
      .then(data => {
          this.setState({
            isRelease: true,
            releases: data.results,
            releasesPag: data.pagination,
          });
      })
  }
  changeCollectionPage(page, pageSize) {
    const url = `https://api.discogs.com/users/neired/collection/folders/0/releases&per_page=${pageSize}&page=${page}`;
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.log('Oops!', error))
      .then(data => {
          this.setState({
            collection: data.results,
            collectionPag: data.pagination,
          });
      })
  }

  addToCollection(id) {
    postRelease(id)
    fetchCollection()
    .then(data => {
      this.setState({
        collection: data.releases,
        collectionPag: data.pagination
      });
    })
  }
  render() {
    const { query, artists, releases, artistsPag, releasesPag, isArtist, isRelease, collection, collectionPag } = this.state;
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
                    searchModes={this.searchModes}
                  ></Filter>
                  {isArtist && <ArtistList isArtist={isArtist} data={artists} pagination={artistsPag} changeArtistPage={this.changeArtistPage}></ArtistList>}
                  {isRelease && <ReleaseList isRelease={isRelease} data={releases} pagination={releasesPag} changeReleasePage={this.changeReleasePage} addToCollection={this.addToCollection}></ReleaseList>}
                  <Collection data={collection} pagination={collectionPag} changeCollectionPage={this.changeCollectionPage}></Collection>
                </>
              )
            }} />
            <Route path="/:detailType/:detailID" render={routerProps => {
              return (
                <Detail 
                  routerProps={routerProps}
                  isArtist={isArtist}
                  isRelease={isRelease}
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