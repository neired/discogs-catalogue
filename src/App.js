import React from 'react';
import './App.less';
import { Layout, Typography, Pagination } from 'antd';
import List from './components/List';
import {fetchData, fetchCollection, postRelease} from './services/IndividualSearch';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail';
import Filter from './components/Filter/Filter';
import Collection from './components/Collection/Collection';

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
      searchBy: ['artist', 'release'],
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

    const requests = this.state.searchBy.map(type => type ? fetchData(this.state.query, type) : Promise.resolve(null))
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
  changeArtistPage(page, pageSize) {
    fetchData(this.state.query, 'artist', page, pageSize)
      .then(data => {
        this.setState({
          artists: data.results,
          artistsPag: data.pagination,
        });
      })
  }
  changeReleasePage(page, pageSize) {
    fetchData(this.state.query, 'release', page, pageSize)
      .then(data => {
        this.setState({
          releases: data.results,
          releasesPag: data.pagination,
        });
      })
  }
  changeCollectionPage(page, pageSize) {
    fetchCollection(page, pageSize)
      .then(data => {
        this.setState({
          collection: data.releases,
          collectionPag: data.pagination,
        });
      })
  }

  addToCollection(id) {
    postRelease(id)
    .then(data => {
      this.state.collection.push(data);
      const newPagination = this.state.collectionPag.items +1;
      this.setState({
        collection: this.state.collection,
        collectionPag: newPagination
      });
    })
  }
  render() {
    const { query, artists, releases, artistsPag, releasesPag, isArtist, isRelease, collection, collectionPag } = this.state;
    const { Header, Footer, Content } = Layout;
    const { Title, Text } = Typography;
    return (
        <Layout className="App">
          <Header className="App-header">
            <Title level={1}>Discogs Catalogue</Title>
          </Header>
          <Content>
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

                      {isArtist && 
                        <List isArtist={isArtist} data={artists} ></List>
                      }
                      {isArtist && artistsPag.pages !== 1 ? 
                        <Pagination size="small" showSizeChanger={false} current={artistsPag.page} total={artistsPag.items} onChange={this.changeArtistPage} pageSize={25}/> : ''
                      }

                      {isRelease && 
                        <List isRelease={isRelease} data={releases} addToCollection={this.addToCollection}></List>
                      }
                      {isRelease && releasesPag.pages !== 1 ? 
                        <Pagination size="small" showSizeChanger={false} defaultCurrent={releasesPag.page} total={releasesPag.items} onChange={this.changeReleasePage} pageSize={25}/> : ''
                      }
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
          </Content>
          <Footer className="App-footer">
            <Text>Made with love</Text>
          </Footer>
        </Layout>
    )
  }
}

export default App;