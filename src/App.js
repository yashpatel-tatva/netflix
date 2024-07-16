import './App.css';
import movieList from './DataStore/datalist';
import React, { useEffect, useState } from 'react';
import ImageView from './components/ImageView/ImageView';
import ScrollContainer from './components/ScrollContainer/ScrollContainer';
import DetailPopup from './components/DetailPopup/DetailPopup';


function App() {
  const [selectedMovie, setSelectedMovie] = useState(movieList[0]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(movieList[0].Id);
  const [selectedMovieIndexFromRecent, setSelectedMovieIndexFromRecent] = useState(1);
  const [selectedMovieIndexFromLiked, setSelectedMovieIndexFromLiked] = useState(1);
  const [selectedMovieIndexFromWatchList, setSelectedMovieIndexFromWatchList] = useState(1);
  const [isMute, setIsMute] = useState(false);
  const [recentId, setrecentId] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [watchListIds, setWatchListIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currMovie, setCurrMovie] = useState(null);

  const refs = movieList.reduce((acc, val) => {
    acc[val.Id] = React.createRef();
    return acc;
  }, [movieList]);


  const recentrefs = movieList.reduce((acc, val) => {
    acc[val.Id] = React.createRef();
    return acc;
  }, [recentId]);

  const likedrefs = movieList.reduce((acc, val) => {
    acc[val.Id] = React.createRef();
    return acc;
  }, [likedIds]);

  const watchlistrefs = movieList.reduce((acc, val) => {
    acc[val.Id] = React.createRef();
    return acc;
  }, [watchListIds]);


  function addinrecentarray(Id) {
    setrecentId((oldId) => {
      const filteredId = oldId.filter(existingId => existingId !== Id);
      return [Id, ...filteredId];
    });
  }
  function addinlikedarray(Id) {
    setLikedIds((oldId) => {
      const check = oldId.find(x => x === Id);
      const filteredId = oldId.filter(existingId => existingId !== Id);
      if (!!check) {
        return [...filteredId];
      }
      else {
        return [Id ,...filteredId];
      }
    });
  }
  function addinwatchlistarray(Id) {
    setWatchListIds((oldId) => {
      const check = oldId.find(x => x === Id);
      const filteredId = oldId.filter(existingId => existingId !== Id);
      if (!!check) {
        return [...filteredId];
      }
      else {
        return [Id ,...filteredId];
      }
    });
  }

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
      if (recentId.length === 0) {
        return;
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

  // For liked list
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (likedIds.length === 0) {
        return;
      }
      const currentIndex = likedIds.findIndex(Id => Id === selectedMovieIndexFromLiked);
      if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % likedIds.length;
        setSelectedMovieIndexFromLiked(likedIds[nextIndex]);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + likedIds.length) % likedIds.length;
        setSelectedMovieIndexFromLiked(likedIds[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMovieIndexFromLiked, likedIds]);
  useEffect(() => {
    likedrefs[selectedMovieIndexFromLiked].current && likedrefs[selectedMovieIndexFromLiked].current.focus();
  }, [selectedMovieIndexFromLiked]);

  // For watchlist list
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (watchListIds.length === 0) {
        return;
      }
      const currentIndex = watchListIds.findIndex(Id => Id === selectedMovieIndexFromWatchList);
      if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % watchListIds.length;
        setSelectedMovieIndexFromWatchList(watchListIds[nextIndex]);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + watchListIds.length) % watchListIds.length;
        setSelectedMovieIndexFromWatchList(watchListIds[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMovieIndexFromWatchList, watchListIds]);
  useEffect(() => {
    watchlistrefs[selectedMovieIndexFromWatchList].current && watchlistrefs[selectedMovieIndexFromWatchList].current.focus();
  }, [selectedMovieIndexFromWatchList]);

  function getmoviehover(movie) {
    setCurrMovie(movie);
  }
  function showmodal() {
    setIsModalOpen(!isModalOpen);
  }

  function checkinlist(currMovie, currList) {
    var check = currList.find(x => x === currMovie.Id)
    return !!check;
  }

  return (
    <div className="App">
      {isModalOpen && <DetailPopup movie={currMovie} isMute={isMute} toggleMute={setIsMute} modalshow={showmodal} handlerecentplayed={addinrecentarray} handleliked={addinlikedarray} handlewatchlist={addinwatchlistarray}
        isRecent={checkinlist(currMovie, recentId)} isLiked={checkinlist(currMovie, likedIds)} isInWatchlist={checkinlist(currMovie, watchListIds)} />}
      <ImageView data={selectedMovie} handlerecentplayed={addinrecentarray} modalShow={showmodal} getMovieHover={getmoviehover} isRecent={checkinlist(selectedMovie, recentId)}  ></ImageView>
      <div className='populertitle'>Populer On Netflix</div>
      <ScrollContainer
        list={movieList}
        setOnFocus={(id) => { setSelectedMovieIndex(id); setSelectedMovie(movieList.find(x => x.Id === id)); }}
        modalShow={showmodal}
        getMovieHover={getmoviehover}
        refs={refs}
      />
      {recentId.length !== 0 &&
        <>
          <div className='titleoflist'>Recently Watched</div>
          <ScrollContainer
            list={recentId.map(id => movieList.find(x => x.Id === id))}
            setOnFocus={(id) => { setSelectedMovieIndexFromRecent(id); setSelectedMovie(movieList.find(x => x.Id === id)); }}
            modalShow={showmodal}
            getMovieHover={getmoviehover}
            refs={recentrefs}
          />
        </>
      }
      {likedIds.length !== 0 &&
        <>
          <div className='titleoflist'>Liked Playlist</div>
          <ScrollContainer
            list={likedIds.map(id => movieList.find(x => x.Id === id))}
            setOnFocus={(id) => { setSelectedMovieIndexFromLiked(id); setSelectedMovie(movieList.find(x => x.Id === id)); }}
            modalShow={showmodal}
            getMovieHover={setCurrMovie}
            refs={likedrefs}
          />
        </>
      }
      {watchListIds.length !== 0 &&
        <>
          <div className='titleoflist'>Your Watchlist</div>
          <ScrollContainer
            list={watchListIds.map(id => movieList.find(x => x.Id === id))}
            setOnFocus={(id) => { setSelectedMovieIndexFromWatchList(id); setSelectedMovie(movieList.find(x => x.Id === id)); }}
            modalShow={showmodal}
            getMovieHover={setCurrMovie}
            refs={watchlistrefs}
          />
        </>
      }
    </div>
  );
}

export default App;
