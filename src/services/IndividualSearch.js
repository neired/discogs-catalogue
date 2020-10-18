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

export const fetchIndividualData = async (query, search) => {
  const ENDPOINT = `https://api.discogs.com/database/search?type=${search}&q=${query}&per_page=25`;
  try {
    const res = await fetch(ENDPOINT, options);
    return res.json();
  } catch (error) {
    return console.log('Looks like there was a problem!', error);
  }
}

export const fetchCollection = async () => {
  const ENDPOINT = "https://api.discogs.com/users/neired/collection/folders/0/releases";
  try {
    const res = await fetch(ENDPOINT, options);
    return res.json();
  } catch (error) {
    return console.log('Looks like we coudnt retrieve your collection!', error);
  }
}

export const postRelease = async (id) => {
  const ENDPOINT = `https://api.discogs.com/users/neired/collection/folders/1/releases/${id}`;
  try {
    const res = await fetch(ENDPOINT, optionsPost);
    return res.json();
  } catch (error) {
    return console.log('We couldnt add that item to your collection!', error);
  }
}