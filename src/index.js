import './sass/main.scss';
import './js/searchApi.js';
import NewsApiService from './js/news-service';
import hitsTmpl from './templates/galleryHits.hbs';
import { onFetchError } from './js/validify';

const newsApiService = new NewsApiService();

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryConatainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.hits-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearHitsContainer();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (newsApiService.query === '') {
    console.log(newsApiService.query);
    return onFetchError();
  }

  newsApiService.resetPage();
  newsApiService.fetchHits().then(appendHitsMarkup);
  clearHitsContainer();
  appendHitsMarkup(hits);
}

function onLoadMore() {
  newsApiService.fetchHits().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.galleryConatainer.insertAdjacentHTML('beforeend', hitsTmpl(hits));
}

function clearHitsContainer() {
  refs.galleryConatainer.innerHTML = '';
}
