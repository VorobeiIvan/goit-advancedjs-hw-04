import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { performSearch } from './pixabay-api';

const el = {
  searchForm: document.getElementById('search-form'),
  searchQueryInput: document.getElementsByName('searchQuery')[0],
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let lightbox = new SimpleLightbox('.gallery-link', {
  captions: true,
});

let currentPage = 1;

el.searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = el.searchQueryInput.value.trim();
  if (searchQuery) {
    try {
      const { hits, totalHits } = await performSearch(searchQuery, currentPage);

      if (totalHits === 0) {
        displayNoResultsMessage();
        return;
      }

      Notiflix.Report.success('Search Results', `Hooray! We found ${totalHits} images.`, 'OK');

      displayImages(hits, totalHits);
      // el.searchQueryInput.value = '';

      if (hits.length >= 40) {
        el.loadMoreBtn.style.display = 'block';
      } else {
        el.loadMoreBtn.style.display = 'none';
      }
    } catch (error) {
      console.error('Search error:', error);

      Notiflix.Report.failure('Search Error', 'Sorry, there was an error retrieving the images. Please try again later.', 'OK');
    }
  } else {
    Notiflix.Report.failure("Please enter a request", 'OK');
    el.searchQueryInput.value = '';
  }
});

el.loadMoreBtn.addEventListener('click', async (event) => {
  currentPage += 1;
  addNextPageImages();
});

function addNextPageImages() {
  performSearch(el.searchQueryInput.value, currentPage)
    .then(({ hits }) => {
      el.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    })
    .catch((error) => {
      console.error('Load more error:', error);
    });
}

function displayImages(hits, totalHits) {
  const markup = createMarkup(hits);
  el.gallery.innerHTML = markup;
  initializeLightbox();

  if (totalHits / hits.length === currentPage) {
    el.loadMoreBtn.style.display = 'block';
  } else {
    el.loadMoreBtn.style.display = 'none';
    Notiflix.Report.info('End of Results', "We're sorry, but you've reached the end of search results.", 'OK');
  }
}

function displayNoResultsMessage() {
  el.gallery.innerHTML = '<p>No results found. Please try another search.</p>';
  el.loadMoreBtn.style.display = 'none';
}

function createMarkup(galleryItems) {
  return galleryItems
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
          <a class="gallery-link" href="${largeImageURL}" title="${tags}" >
            <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy">
          </a>
          <div class="info">
            <p class="info-item">
            <b>Likes</b> ${likes}</p>
            <p class="info-item">
            <b>Views</b> ${views}</p>
            <p class="info-item">
            <b>Comments</b> ${comments}</p>
            <p class="info-item">
            <b>Downloads</b> ${downloads}</p>
          </div>
        </div>
      `;
    })
    .join('');
}

function initializeLightbox() {
  if (lightbox && lightbox.destroy) {
    lightbox.destroy();
  }

  lightbox = new SimpleLightbox('.gallery-link', {
    captions: true,
  });
}
