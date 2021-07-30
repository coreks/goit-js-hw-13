import { onFetchError } from './validify';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  fetchHits() {
    console.log(this);
    const options = {
      key: '22675248-9d53002fe5bb858ba3591edf9',
    };

    const url = `https://pixabay.com/api/?key=${options.key}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.hits.length === 0) {
          return onFetchError();
        }
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
