import hitsTmpl from '../templates/galleryHits.hbs';
import getRefs from './getRefs.js';

const refs = getRefs();

function appendHitsMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', hitsTmpl(hits));
}

function clearHitsContainer() {
  refs.galleryContainer.innerHTML = '';
}

export { appendHitsMarkup, clearHitsContainer };
