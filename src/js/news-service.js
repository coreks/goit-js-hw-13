import { onFetchError } from './validify';
import LoadMoreBtn from './loadMoreBtn';

const KEY = '22675248-9d53002fe5bb858ba3591edf9';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  fetchHits() {
    console.log(this);

    const url = `${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&page=${this.page}&per_page=${this.per_page}?fields=webformatURL;largeImageURL;tags;likes;views;comments;downloads`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          onFetchError();
          LoadMoreBtn.disable();
          return;
        }
        this.incrementPage();
        console.log(hits);
        return hits;
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
