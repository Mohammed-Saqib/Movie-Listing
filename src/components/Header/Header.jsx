import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import './Header.scss';


const Header = () => {
    const[term, setTerm] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(term == "") return alert("Please Type The Movie Or Show Name")
       dispatch(fetchAsyncMovies(term));
       dispatch(fetchAsyncShows(term));
       setTerm('');

    };

    return(
        <div className='header'>        
           <div className='logo'><Link to='/'>Movie App</Link></div>    
           <div className="search-bar">
               <form onSubmit={submitHandler}> 
                   <input type="text"  value={term} placeholder='Search Movies Or Shows' onChange={(e) => setTerm(e.target.value)}/>
                   <button type='submit'><i className='fas fa-search'></i></button>
               </form>
           </div>       
           <div className='user-image'><span><i className='fas fa-user fa-3x'></i></span></div>
        </div>
    );
};

export default Header;
