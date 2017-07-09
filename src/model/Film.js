import { getRandom } from '../utils/helper_functions';
import { FILM_URL } from '../utils/constants';

const fetchFilmData = (component) => {
  fetch(`${FILM_URL}${getRandom(7)}`)
  .then(res => res.json())
  .then(({ title, opening_crawl: text, release_date: date, episode_id: episode }) => {
    const film = { title, text, date, episode }

    component.setState({ film });
  })
  .catch(err => component.setState({ errorStatus: 'Error fetching film' }))
}

export default fetchFilmData;
