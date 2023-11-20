import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies : []
    },
    reducers:{
        addMovie(state,action){
            const movie = action.payload;
            state.movies.push({
                movieName: movie.movieName,
                yearOfRelease: movie.yearOfRelease,
                moviePhoto: movie.moviePhoto,
                rating: movie.rating,
                reviewComments: movie.reviewComments,
                totalRatingValue: movie.totalRatingValue,
                numberOfUsersGivenRating: movie.numberOfUsersGivenRating,
                movieId: movie.movieId
            });
        }
    }
})

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;