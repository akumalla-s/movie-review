import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Logout from "./components/Logout";
import About from "./components/About";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import HelperService from "./services/HelperService";
import { authActions } from "./store/authReducer";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationSuccess from "./components/RegistrationSuccess";
import MovieReview from "./components/MovieReview";
import AddMovieData from "./components/AddMovieData";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state)=>state.auth.isAdmin);

  console.log("User Logged In: "+isLoggedIn+" is Admin: "+isAdmin);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const user = HelperService.getCurrentUserData();
    if (user) {
      const username = user.username;
      const _id = user._id;
      const isAdmin = user.isAdmin;
      dispatch(authActions.login({
        username,
        _id,
        isAdmin,
      }));
    }
  }, [dispatch]);

  return (
    <Router>
      <div >
        <NavBar searchTerm={searchTerm} onSearch={setSearchTerm}/>
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Body searchTerm={searchTerm}/>} />
          <Route path="/login" element={<Login /> } />
          <Route path="/logout" element={<Logout /> } />
          <Route path="/about" element={<About /> } />
          <Route path="/review/:movieId" element={ <MovieReview /> } />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/add-movie-data" element={isAdmin ? <AddMovieData /> : <Navigate to="/" />} />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
