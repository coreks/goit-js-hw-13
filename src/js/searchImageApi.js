import NewsApiService from './newsService';
import getRefs from './getRefs.js';
import { onFetchError } from './validify';
import LoadMoreBtn from './loadMoreBtn';
import { appendHitsMarkup, clearHitsContainer } from './renderMarkup';

const newsApiService = new NewsApiService();

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (newsApiService.query === '') {
    return onFetchError();
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearHitsContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  newsApiService.fetchHits().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
  });
}
