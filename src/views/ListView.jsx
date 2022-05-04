import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

function ListView() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('all');
  const [filteredResults, setFilteredresults] = useState([]);
  const [page, setPage] = useState(1);

  const params = useParams();
  const history = useHistory();
  const URL = `https://rickandmortyapi.com/api/character?page=${page}`;

  useEffect(() => {
    const fetchCharacterList = async () => {
      const response = await fetch(URL);
      const { results } = await response.json();
      setCharacters(results);
      setLoading(false);
    };
    fetchCharacterList();
  }, [page]);

  useEffect(() => {
    page === 1 ? null : setPage(params.page);
  }, []);

  useEffect(() => {
    history.push(`/characters/${page}`);
  }, [page]);

  useEffect(() => {
    filterBy === 'all' && setFilteredresults([]);
    const results = characters.filter((character) => {
      return character.species === filterBy;
    });
    setFilteredresults(results);
  }, [filterBy]);

  const listDisplay = filteredResults.length ? filteredResults : characters;

  const pageBack = () => {
    setPage(page - 1);
  };
  const pageForward = () => {
    setPage(page + 1);
  };

  return (
    <>
      <label htmlFor="filter">Sort Characters by: </label>
      <select
        id="filter"
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
        <option value={'all'}>All</option>
        <option value={'Human'}>Human</option>
        <option value={'Alien'}>Alien</option>
      </select>

      <aside className="pages">
        <button onClick={pageBack}>{'<'}</button>
        <span>Page</span>
        <button onClick={pageForward}>{'>'}</button>
      </aside>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        listDisplay.map((character) => {
          return (
            <div key={character.id + character.name}>
              <Link to={`/character/${character.id}`}>
                <h3>{character.name}</h3>
              </Link>
            </div>
          );
        })
      )}
    </>
  );
}

export default ListView;
