import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailView() {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharcterDetail = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const json = await response.json();
      setCharacter(json);
      setLoading(false);
    };
    fetchCharcterDetail();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {' '}
          <h3>{character.name}</h3>
          <img alt={`Image of ${character.name}`} src={character.image}></img>
          <p>{`Species: ${character.species}`}</p>
          <p>{`Gender: ${character.gender}`}</p>
          <p>{`Status: ${character.status}`}</p>
          <p>{`Origin: ${character.origin.name}`}</p>
        </>
      )}
    </>
  );
}

export default DetailView;
