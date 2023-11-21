import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayMovie from './DisplayMovie';
import ReactPaginate from 'react-paginate';
import '../css/DisplayMovie.css';

export default function DisplayMovies({searchTerm={searchTerm}}) {

  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 4;
  const pagesVisited = pageNumber * moviesPerPage;

  const getAllMoviesUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/movies';
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTkzMWM4NjY5ZjJjZjM0N2YyNmMyZCIsInVzZXJuYW1lIjoiMDAyNzk4MTY2UyIsImlhdCI6MTcwMDM0NDI2OCwiZXhwIjoxNzAxNjQwMjY4fQ.3YuL_w8ovVtTfS0RvFuPSf-f1DbXF4jL16hGqmJyJIo";
  const config = { headers: { Authorization: `${token}` } };

  const getAllMovies = async () => {
    try {
      const response = await axios.get(getAllMoviesUrl, config);
      let filteredMovies = response.data.data;

      if (searchTerm) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setMovies(filteredMovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, [searchTerm]);

  const displayMovies = movies
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => (
      <DisplayMovie
        key={movie._id}
        movieName={movie.movieName}
        yearOfRelease={movie.yearOfRelease}
        moviePhoto={movie.moviePhoto}
        rating={movie.rating}
        reviewComments={movie.reviewComments}
        totalRatingValue={movie.totalRatingValue}
        numberOfUsersGivenRating={movie.numberOfUsersGivenRating}
        movieId={movie._id}
      />
    ));

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {displayMovies.length > 0 ? (
        <div>
          {displayMovies}
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
            pageLinkClassName={'pagination__number'}
          />
        </div>
      ) : (
        <p>No Movies Available</p>
      )}
    </div>
  );
}
