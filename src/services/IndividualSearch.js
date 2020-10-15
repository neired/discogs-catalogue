const token = "WQcFMnNpoKKKPWCLQbUQKCcXGSNYUkGMqaWkfzmd";

export const options = {
  method: 'GET',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Discogs token=${token}`
  }
};

export const fetchIndividualData = async (query, search) => {
  const ENDPOINT = `https://api.discogs.com/database/search?type=${search}&q=${query}`;
  try {
    const res = await fetch(ENDPOINT, options);
    return await res.json();
  } catch (error) {
    return console.log('Looks like there was a problem!', error);
  }
}