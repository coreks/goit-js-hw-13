import Notiflix from 'notiflix';

function onFetchError() {
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

export { onFetchError };
