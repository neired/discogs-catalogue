const token = "WQcFMnNpoKKKPWCLQbUQKCcXGSNYUkGMqaWkfzmd";

export const options = {
  method: 'GET',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Discogs token=${token}`
  }
};

const fetchIndividualData = async (query, search) => {
  const ENDPOINT = `https://api.discogs.com/database/search?type=${search}&q=${query}`;
  try {
    const res = await fetch(ENDPOINT, options);
    return await res.json();
  } catch (error) {
    return console.log('Looks like there was a problem!', error);
  }
}

const fetchCombinedData = (query) => {
  let ENDPOINTS = [`https://api.discogs.com/database/search?type=artist&q=${query}`, `https://api.discogs.com/database/search?type=release&q=${query}`]
  let requests = ENDPOINTS.map(url => 
    fetch(url, options)
    .then(response => response.json())
    .catch(error =>console.log(error))
  );
  return Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(response)
  ))
}
export {fetchIndividualData, fetchCombinedData};