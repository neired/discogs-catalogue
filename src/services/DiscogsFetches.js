const token = "WQcFMnNpoKKKPWCLQbUQKCcXGSNYUkGMqaWkfzmd";

export const options = {
  method: 'GET',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Discogs token=${token}`
  }
};
const optionsPost = {
  method: 'POST',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Discogs token=${token}`
  }
};

export const fetchData = async (query, search, page = 1, pageSize = 12) => {
  const ENDPOINT = `https://api.discogs.com/database/search?type=${search}&q=${query}&per_page=${pageSize}&page=${page}`;
  try {
    const res = await fetch(ENDPOINT, options);
    return res.json();
  } catch (error) {
    return console.log('Looks like there was a problem!', error);
  }
}

export const fetchCollection = async (page = 1, pageSize = 12) => {
  const ENDPOINT = `https://api.discogs.com/users/neired/collection/folders/0/releases?per_page=${pageSize}&page=${page}`;
  try {
    const res = await fetch(ENDPOINT, options);
    return res.json();
  } catch (error) {
    return console.log(`Looks like we couldn't retrieve your collection!`, error);
  }
}

export const postRelease = async (id) => {
  const ENDPOINT = `https://api.discogs.com/users/neired/collection/folders/1/releases/${id}`;
  try {
    const res = await fetch(ENDPOINT, optionsPost);
    return res.json();
  } catch (error) {
    return console.log(`We couldn't add that item to your collection!`, error);
  }
}

