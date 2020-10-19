import React from 'react';
import './App.less';
import { Layout, Typography, Pagination, Spin, Divider } from 'antd';
import List from './components/List/List';
import {fetchData, fetchCollection, postRelease} from './services/DiscogsFetches';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Filter from './components/Filter/Filter';
import Collection from './components/Collection/Collection';
import { HeartOutlined } from '@ant-design/icons';
class App extends React.Component {
  constructor(props) {
    super(props); 
    this.ref = React.createRef();
    this.state = {
      loading: false,
      isCollectionLoading: true,
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
        collectionPag: data.pagination,
        isCollectionLoading: false
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
      loading: true,
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
          loading: false,
          isArtist: true,
          artists: responses[0].results,
          artistsPag: responses[0].pagination,
        })
      }
      if(responses[1]) {
        this.setState({
          loading: false,
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
    this.setState({ loading: true });
    fetchData(this.state.query, 'artist', page, pageSize)
      .then(data => {
        this.setState({
          loading: false,
          artists: data.results,
          artistsPag: data.pagination,
        });
      })
  }
  changeReleasePage(page, pageSize) {
    this.setState({ loading: true });
    fetchData(this.state.query, 'release', page, pageSize)
      .then(data => {
        this.setState({
          loading: false,
          releases: data.results,
          releasesPag: data.pagination,
        });
      })
  }
  changeCollectionPage(page, pageSize) {
    this.setState({ loading: true });
    fetchCollection(page, pageSize)
      .then(data => {
        this.setState({
          loading: false,
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
    const { query, artists, releases, artistsPag, isCollectionLoading, loading, releasesPag, isArtist, isRelease, collection, collectionPag } = this.state;
    const { Header, Footer, Content } = Layout;
    const { Title, Text } = Typography;
    return (
        <Layout className="app">
          <Header className="header">
            <a href='/'>
              <Title level={1} className="header-title">Discogs Catalogue</Title>
            </a>
          </Header>
          <Content>
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
                      isArtist={isArtist}
                      isRelease={isRelease}>
                    </Filter>
                    <Spin spinning={loading} size="large"></Spin>
                    {isArtist && 
                      <List isArtist={isArtist} data={artists} ></List>
                    }
                    {isArtist && artistsPag.pages !== 1 ? 
                      <Pagination 
                        size="small" 
                        showSizeChanger={false} 
                        current={artistsPag.page} 
                        total={artistsPag.items} 
                        onChange={this.changeArtistPage} 
                        pageSize={12}/> : ''
                    }

                    {isRelease && 
                      <List 
                        isRelease={isRelease} 
                        data={releases} 
                        addToCollection={this.addToCollection}>
                      </List>
                    }
                    {isRelease && releasesPag.pages !== 1 ? 
                      <Pagination 
                        size="small" 
                        showSizeChanger={false} 
                        defaultCurrent={releasesPag.page} 
                        total={releasesPag.items} 
                        onChange={this.changeReleasePage} 
                        pageSize={12}/> : ''
                    }
                    <Collection 
                      data={collection} 
                      pagination={collectionPag}
                      loading={isCollectionLoading}
                      changeCollectionPage={this.changeCollectionPage}>
                    </Collection>
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
          </Content>
          <Divider className="footer-divider"></Divider>
          <Footer className="footer">
            <Text><a href='/'>Discogs Catalogue</a></Text>
            <Text>Made with <HeartOutlined/> by <a href='https://github.com/neired'>Natalia Millán</a></Text>
          </Footer>
        </Layout>
    )
  }
}

export default App;