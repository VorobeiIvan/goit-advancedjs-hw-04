import axios from 'axios';

const apiKey = '40813799-13823f8fac4dfa82ba757ecf4';

export async function performSearch(query, page = 1, perPage = 40) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    return { hits: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Error getting data:', error);
    Notiflix.Notify.failure('Sorry, there was an error retrieving the images. Please try again later.');
    throw error;
  }
}
