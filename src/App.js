import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Logout from "./components/Logout"
import RestaurentReview from "./components/RestaurentReview";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <Router>
      <div >
        <NavBar />
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/logout" element={<Logout /> } />
          <Route path="/about" element={<About /> } />
          <Route path="/review/:restaurentId" element={!isLoggedIn && <RestaurentReview /> } />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
