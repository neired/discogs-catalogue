## Discogs Catalogue 🎶
### 🔴 What is it?

Discogs is the biggest database of information about audio recordings in all formats (cassette, vinyl, CDs, etc.).

[**Discogs Catalogue**](https://neired.github.io/discogs-catalogue/#/) is a client application for Discogs database and it has the following features:
- Search: it contains an input to search by artist, album, or both.
- Pagination: results are shown with pagination.
- Detail: all results are clickable and show further information in a detail view.
- `Collection`: it displays your own collection of records.
- `Add to the collection`: albums can be added to your collection through a button.

### 🟠 How to run

First run `npm install` in the command line to install all dependencies needed. 

Then run `npm start` to start the project in development mode and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

💫  As simple as that!

### 🟡 Technologies

**Discogs Catalogue** has been developed with:
- [Create React App](https://github.com/facebook/create-react-app)
- [React Router](https://reactrouter.com/)
- [Ant Design](https://ant.design/)
- [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme)

Further information about the development process and organization followed in order to achieve the final result can be found in the [GitHub repository project](https://github.com/neired/discogs-catalogue/projects/1). Im broad terms, the milestones set at the beginning were:
- Setp up (installation of dependencies needed, folder structure, etc)
- API call (first attempts to connect with the API)
- Front (including styles and functionalities)
- Testing
- Publish (including final touches and publication of the page in GitHubPages)

### 🟢 API

The REST API from Discogs that has been used consumes the following endpoints:

| HTTP verb |    URI    | Action           |
|:---------:|:---------:|:----------------:|
| GET       | /database/search?q={query}&{?type,title,artist} | lists all items that match the query and type |
| GET       | /releases/{release_id} | provides detailed information about a particular release |
| GET       | /releases/{release_id} | provides detailed information about a particular release |
| GET       | /artists/{artist_id} | provides detailed information about a particular artist |
| GET       | /users/{username}/collection/folders/0 | retrieves metadata about folder "All" in user’s collection |
| POST       | /users/{username}/collection/folders/{folder_id}/releases/{release_id} | add a release to a folder in user’s collection |


### 🔵 Testing

Only four basic tests regarding search usage have been implemented. Further testing is recommended.

They can be run through the command: `npm run test`.

### 🟣 Contact details
For further information you can contact me through [email](mailto:nmillans91@gmail.com).