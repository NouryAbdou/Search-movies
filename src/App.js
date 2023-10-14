import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';

//a451a0f4
const api_url = 'http://www.omdbapi.com/?i=tt3896198&apikey=a451a0f4';
const App =() => {
    const [movies, setmovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchmovies = async (title)=> {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();
        setmovies(data.Search);
    }
   useEffect(()=> {
    searchmovies('all');
   }, []);
   return(

    <div className="app">

        <h1>Movie Land</h1>
        <div className="search">
            <input placeholder="Search for movies" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt="search" onClick={()=> searchmovies(searchTerm)}/>
        </div>

        {movies?.length>0 
        ?
            (
                <div className="container">
                    {movies.map((movie)=> (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) 
        :
            (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
   </div>
   );
}

export default App;