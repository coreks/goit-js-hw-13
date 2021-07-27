export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchHits() {
    console.log(this);
    const options = {
      key: '22675248-9d53002fe5bb858ba3591edf9',
    };

    const url = `https://pixabay.com/api/?key=${options.key}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&page={this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  reserPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}