import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncMovieOrShowDetail, getSelectedMovieOrShow, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';
import './MovieDetail.scss';

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovieOrShow); // fetching data from redux store
    // console.log(data);

    useEffect(() => {
      dispatch(fetchAsyncMovieOrShowDetail(imdbID));
      return () => {
          dispatch(removeSelectedMovieOrShow());
      }
    },[dispatch, imdbID])

    return(
        <div className='movie-section'>
        {Object.keys(data).length === 0 ? 
        (<div><h4>....Loading</h4></div>) : 
        (
        
        <>
           <div className="section-left">
               <div className="movie-title"><h2>{data.Title}</h2></div>
               <div className="movie-rating">
                   <span>IMDB Rating <i className='fas fa-star'></i>:&nbsp;{data.imdbRating}</span>
                   <span>IMDB Votes <i className='fas fa-thumbs-up'></i>:&nbsp;{data.imdbVotes}</span>
                   <span>Runtime <i className='fas fa-film'></i>:&nbsp;{data.Runtime}</span>
                   <span>Year <i className='fas fa-calendar'></i>:&nbsp;{data.Year}</span>
               </div>
               <div className="movie-plot">{data.Plot}</div>
               <div className="movie-info">
                   <div>
                       <span>Director:&nbsp;</span>
                       <span>{data.Director}</span>
                   </div>
                   <div>
                       <span>Stars:&nbsp;</span>
                       <span>{data.Actors}</span>
                   </div>
                   <div>
                       <span>Generes:&nbsp;</span>
                       <span>{data.Genre}</span>
                   </div>
                   <div>
                       <span>Languages:&nbsp;</span>
                       <span>{data.Language}</span>
                   </div>
                   <div>
                       <span>Awards:&nbsp;</span>
                       <span>{data.Awards}</span>
                   </div>
               </div>
           </div>
           <div className="section-right">
               <img src={data.Poster} alt={data.Title} />
           </div>
        </>
        )
        }
  
        </div>
  );
};

export default MovieDetail;
