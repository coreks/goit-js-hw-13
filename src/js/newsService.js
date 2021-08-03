import { onFetchError, onFechEnd } from './validify';
import LoadMoreBtn from './loadMoreBtn';
const axios = require('axios').default;

const KEY = '22675248-9d53002fe5bb858ba3591edf9';
const BASE_URL = 'https://pixabay.com/api';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchHits() {
    const url = `${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

    try {
      const response = await axios(url);
      const newHits = await response.data.hits;

      this.incrementPage();

      if (newHits.length === 0) {
        loadMoreBtn.enable();
        loadMoreBtn.hide();
        return onFetchError();
      }

      if (newHits.length < this.per_page) {
        loadMoreBtn.disable();
        loadMoreBtn.hide();
        onFechEnd();
      }
      return newHits;
    } catch {
      console.log(error);
    }
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
