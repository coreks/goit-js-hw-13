import './sass/main.scss';
import './js/searchApi.js';
import NewsApiService from './js/news-service';
import hitsTmpl from './templates/galleryHits.hbs';
import { onFetchError } from './js/validify';
import LoadMoreBtn from './js//loadMoreBtn';

const newsApiService = new NewsApiService();

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

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
    console.log(newsApiService.query);
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

function appendHitsMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', hitsTmpl(hits));
}

function clearHitsContainer() {
  refs.galleryContainer.innerHTML = '';
}
