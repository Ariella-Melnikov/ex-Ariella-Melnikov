export const googleBookService = {
    query,
  };
  
  function query(txt) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${txt}`)
      .then(res => res.json())
      .then(res => res.items.map(item => item.volumeInfo));
  }