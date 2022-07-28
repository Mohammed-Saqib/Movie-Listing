import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows, getLoader } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss';
import Slider from 'react-slick';
import { Settings } from '../../common/setting';

const MovieListing = () => {
  const movies  = useSelector(getAllMovies); // fetching data from redux store
  const shows  = useSelector(getAllShows); // fetching data from redux store
  const loader = useSelector(getLoader); // fetching data from redux store
  let renderMovies = "", renderShows = "";
  // console.log(movies)
  console.log(loader)

  renderMovies = movies.Response == "True" ? (
    movies.Search.map((movie, index) => (
      <MovieCard key={index} data={movie}/>
    ))
  ) : ( <div className='movies-error'><h3>{movies.Error}</h3></div>)

  renderShows = shows.Response == "True" ? (
    shows.Search.map((show, index) => (
      <MovieCard key={index} data={show}/>
    ))
  ) : ( <div className='shows-error'><h3>{shows.Error}</h3></div>)


  return(
        <div className='movie-wrapper'>
           <div className="movie-list">
             <h2>Movies</h2>
             {!loader ? (<div><h4>Loadind Please Wait....</h4></div>) : (
             <div className="movie-container"><Slider {...Settings}>{renderMovies}</Slider></div>  
             )}    
           </div> 
           <div className="shows-list">
             <h2>Shows</h2>
             {!loader ? (<div><h4>Loadind Please Wait....</h4></div>) : (
             <div className="movie-container"><Slider {...Settings}>{renderShows}</Slider></div>
             )}    
           </div>
        </div>
  );
};

export default MovieListing;
