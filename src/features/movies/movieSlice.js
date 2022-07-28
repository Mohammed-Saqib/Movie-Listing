import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {APIkey} from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi'

// its take two arguments identifier and callvbackfunction and one more is object
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async(term) => {
    // const movieText = 'Harry';
    const response = await movieApi.get(`?apikey=${APIkey}&s=${term}&type=movie`)
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async(term) => {
    // const seriesText = 'Friends';
    const response = await movieApi.get(`?apikey=${APIkey}&s=${term}&type=series`)
    return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async(id) => {
    const response = await movieApi.get(`?apikey=${APIkey}&i=${id}&plot=full`)
    return response.data;
});

const initialState = {
    movies:{},
    shows: {},
    selectedMovieOrShow: {},
    loader : false,
}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        // addMovies : (state, {payload}) => {  //using immer method which takes the copy of object and then allow us to make update
        //     state.movies = payload;
        // },
        removeSelectedMovieOrShow : (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            console.log("Pending");
            state.loader = false;
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully");
            return {...state, movies:payload, loader : true};
        },
        [fetchAsyncMovies.rejected]: (state) => {
            console.log("Rejected");
            state.loader = false;
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully");
            return {...state, shows:payload, loader : true};
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully");
            return {...state, selectedMovieOrShow:payload};
        },
    },
    
})

// export const {addMovies} = movieSlice.actions;
export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getLoader = (state) => state.movies.loader;

export default movieSlice.reducer;