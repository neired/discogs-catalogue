const token = "WQcFMnNpoKKKPWCLQbUQKCcXGSNYUkGMqaWkfzmd";

const fetchData = (query) => {
    return fetch(`https://api.discogs.com/database/search?q=${query}`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Discogs token=${token}`
      }
    })
    .then(res => res.json())
}

export {fetchData};