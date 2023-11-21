import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { performSearch } from './pixabay-api';

document
  .getElementById('search-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchQuery = document.getElementsByName('searchQuery')[0].value;

    if (searchQuery.trim() !== '') {
      try {
        const { hits, totalHits } = await performSearch(searchQuery);
        displayImages(hits);
        updateLightbox();
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      alert('Please enter a search query.');
    }
  });

// function displayImages(images) {
//   const gallery = document.querySelector('.gallery');

//   if (images.length > 0) {
//     images.forEach(image => {
//       const card = document.createElement('div');
//       card.className = 'photo-card';

//       const img = document.createElement('img');
//       img.src = image.webformatURL;
//       img.alt = image.tags;
//       img.loading = 'lazy';

//       const info = document.createElement('div');
//       info.className = 'info';

//       const likes = createInfoItem('Likes', image.likes);
//       const views = createInfoItem('Views', image.views);
//       const comments = createInfoItem('Comments', image.comments);
//       const downloads = createInfoItem('Downloads', image.downloads);

//       info.appendChild(likes);
//       info.appendChild(views);
//       info.appendChild(comments);
//       info.appendChild(downloads);

//       card.appendChild(img);
//       card.appendChild(info);

//       gallery.appendChild(card);
//     });
//   } else {
//     gallery.innerHTML =
//       '<p>Sorry, no images were found for your request. Try again.</p>';
//   }
// }

// function createInfoItem(label, value) {
//   const item = document.createElement('p');
//   item.className = 'info-item';
//   item.innerHTML = `<b>${label}:</b> ${value}`;
//   return item;
// }

function updateLightbox() {
  const lightbox = new SimpleLightbox('.gallery img');
  lightbox.refresh();
}

function scrollToNextGroup() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function displaySearchResultMessage(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function displayEndOfResultsMessage() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
