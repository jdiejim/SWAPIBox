import { getRandom } from '../utils/helper_functions';
import { FILM_URL } from '../utils/constants';

const fetchFilmData = (component) => {
  fetch(`${FILM_URL}${getRandom(7)}`)
  .then(res => res.json())
  .then(data => {
    const film = {
      title: data.title,
      text: data.opening_crawl,
      date: data.release_date,
      episode: data.episode_id
    }
    component.setState({ film });
  })
}

export default fetchFilmData;
