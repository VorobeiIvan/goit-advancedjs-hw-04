import axios from 'axios';
import Notiflix from 'notiflix';

const apiKey = '40813799-13823f8fac4dfa82ba757ecf4';

export async function performSearch(query, page = 1) {
  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
    Notiflix.Notify.failure(
      'Sorry, there was an error retrieving the images. Please try again later.'
    );
    throw error;
  }
}
