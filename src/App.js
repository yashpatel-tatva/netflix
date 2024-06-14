import './App.css';
import movieList from './DataStore/datalist';
import { useState } from 'react';
import React, { useEffect, useRef, forwardRef } from 'react';
import ImageView from './components/ImageView/ImageView';
import Datacard from './components/Datacard/Datacard';


function App() {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(movieList[0].Id);
  const [selectedMovieIndexFromRecent, setSelectedMovieIndexFromRecent] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState(movieList[0]);
  
  const refs = movieList.reduce((acc, val) => {
    acc[val.Id] = React.createRef();
    return acc;
  }, {});
  const recentrefs = movieList.reduce((acc, val) => {
    acc[val.Id] = React.createRef();
    return acc;
  }, {});

  function addinrecentarray(Id) {
    setrecentId((oldId) => {
      const filteredId = oldId.filter(existingId => existingId !== Id);
      return [Id, ...filteredId];
    });
  }

  const [recentId, setrecentId] = useState([]);

  // For popular list
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentIndex = movieList.findIndex(movie => movie.Id === selectedMovieIndex);
      if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % movieList.length;
        setSelectedMovieIndex(movieList[nextIndex].Id);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + movieList.length) % movieList.length;
        setSelectedMovieIndex(movieList[prevIndex].Id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMovieIndex, movieList]);
  useEffect(() => {
    refs[selectedMovieIndex].current && refs[selectedMovieIndex].current.focus();
  }, [selectedMovieIndex]);

  // For recently watched list
  useEffect(() => {
    const handleKeyDown = (event) => {
      if(recentId.length == 0){
          return ;
      }
      const currentIndex = recentId.findIndex(Id => Id === selectedMovieIndexFromRecent);
      if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % recentId.length;
        setSelectedMovieIndexFromRecent(recentId[nextIndex]);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + recentId.length) % recentId.length;
        setSelectedMovieIndexFromRecent(recentId[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMovieIndexFromRecent, recentId]);
  useEffect(() => {
    recentrefs[selectedMovieIndexFromRecent].current && recentrefs[selectedMovieIndexFromRecent].current.focus();
  }, [selectedMovieIndexFromRecent]);

  return (
    <div className="App">
      <ImageView  data={selectedMovie}  handlerecentplayed={addinrecentarray}></ImageView>
      <div className='populertitle'>Populer On Netflix</div>
      <div className='populerscroll'>
        {movieList.map((movie) => (
          <Datacard
            key={movie.Id}
            data={movie}
            onFocus={() => {setSelectedMovieIndex(movie.Id) ; setSelectedMovie(movie);}}
            ref={refs[movie.Id]}
          ></Datacard>
        ))}
      </div>
      <div className='recentlywatched'>Recently Watched</div>
      <div className='recentlywatchedscroll'>
        {recentId.map((Id) => {
          var movie = movieList.find(x => x.Id === Id)
          return (
            <Datacard
              key={movie.Id}
              data={movie}
              onFocus={() => {setSelectedMovieIndexFromRecent(movie.Id); setSelectedMovie(movie);}}
              ref={recentrefs[movie.Id]}
            ></Datacard>
          )
        })}
      </div>
    </div>
  );
}

export default App;
